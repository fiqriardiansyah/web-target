/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, List, Spin } from "antd";
import React, { ChangeEvent } from "react";
import { OrderCardSales } from "..";
import { ModalCustom } from "../../../components";
import { ModalCustomProps } from "../../../components/modal/modal";
import { salesService } from "../../../services";

interface SearchCustomerSalesProps extends ModalCustomProps {
    onChooseOrder: (order: PendingOrderList, customer: SearchCustomer) => void;
    onCreateNewOrder: (customer: SearchCustomer) => void;
}

export default function SearchCustomerSales({ onChooseOrder, onCreateNewOrder, ...props }: SearchCustomerSalesProps) {

    const closeRef = React.useRef<HTMLButtonElement | null>(null);
    const [search, setSearch] = React.useState<string>('');
    const [customer, setCustomer] = React.useState<SearchCustomer | null>(null);

    const customerQuery = useQuery({
        queryFn: async () => (await salesService.SearchCustomer()).data?.data,
        queryKey: [salesService.searchCustomer],
    });

    const pendingQuery = useQuery({
        queryFn: async ({ queryKey }) => {
            const customerId = queryKey[0];
            return (await salesService.PendingOrder({ cust_id: customerId })).data?.data;
        },
        queryKey: [customer?.id],
        enabled: !!customer
    });

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        setCustomer(null);
    }

    const customers = customerQuery.data
        ?.filter((c) =>
            c.name.toLowerCase().includes(search?.toLowerCase())
            || c.phone_number.includes(search)
            || (c.name + ' - ' + c.phone_number).toLowerCase().includes(search?.toLowerCase()))
        ?.filter((_, i) => i < 9)
        ?.map((c) => ({ label: c.name + ' - ' + c.phone_number, value: c.id }));

    const onClickCustomerItem = (id: number) => {
        return () => {
            const customer = customerQuery.data?.find((c) => c.id === id);
            if (!customer) return;
            setCustomer(customer);
            setSearch(customer.name + ' - ' + customer.phone_number);
        }
    }

    const onChooseOrderList = (order: PendingOrderList) => {
        closeRef.current?.click();
        if (onChooseOrder) {
            onChooseOrder(order, customer!);
        }
    }

    const onCreateNewOrderClick = (customer: SearchCustomer) => {
        return () => {
            closeRef.current?.click();
            onCreateNewOrder(customer);
        }
    }

    return (
        <ModalCustom {...props} handlerInComponent={props.children} footer={null}>
            {(ctrl) => (
                <div className="pt-3">
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <Input
                        suffix={<SearchOutlined />}
                        size="large"
                        value={search}
                        className="w-full mb-4"
                        disabled={customerQuery.isPending}
                        onChange={onChangeSearch}
                        placeholder="Cari nama atau No hp customer" />

                    {search?.length >= 2 && !customer && (
                        <List bordered dataSource={customers} renderItem={(item) => (
                            <List.Item onClick={onClickCustomerItem(item.value)} className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10">
                                <p className="font-semibold">{item.label}</p>
                            </List.Item>
                        )} />
                    )}

                    {pendingQuery?.isPending && customer && <div className="w-full flex items-center h-[150px] justify-center">
                        <Spin size="large" />
                    </div>}

                    {!pendingQuery.isPending && !pendingQuery.data?.length && customer && <p className="text-gray-500 mb-20">Tidak ada pending order</p>}

                    {pendingQuery.data?.map((order: any, i) => (
                        <>
                            <OrderCardSales onChooseOrder={onChooseOrderList} order={order} refreshPendingOrder={pendingQuery.refetch} key={i} />
                            <div className="w-full h-[1px] bg-gray-200 mt-2 mb-4"></div>
                        </>
                    ))}

                    <Button onClick={onCreateNewOrderClick(customer!)} disabled={!customer} type="primary" className="w-full mt-5" size="large">
                        Create New Order
                    </Button>
                </div>
            )}
        </ModalCustom>
    )
}