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

const pendingOrder = [
    {
        "order_id": 64123,
        "order_no": null,
        "inv_no": null,
        "ref_id": null,
        "ref_no": null,
        "voucher_id": [],
        "voucher": null,
        "list": [
            {
                "product_id": 11931,
                "product_qty": "1",
                "product_price": "3100000.00",
                "stock": 5,
                "product_code1": "SLGBPMCFL",
                "product_name": "KACA FILM SOLARGARD MEDIUM CAR FULL",
                "product_images": null,
                "is_pkg": true
            }
        ]
    },
    {
        "order_id": 65417,
        "order_no": null,
        "inv_no": null,
        "ref_id": null,
        "ref_no": null,
        "voucher_id": [],
        "voucher": [
            {
                "name": "DISCOUNT ",
                "price": 1900000,
                "percentage": null,
                "product_id": null,
                "product": null,
                "service": null
            }
        ],
        "list": [
            {
                "product_id": 11807,
                "product_qty": "1",
                "product_price": "7000000.00",
                "stock": 11,
                "product_code1": "JKPAL3BMC",
                "product_name": "JOK PATEN ARTICOLEDER 3 BARIS (MEDIUM CAR)",
                "product_images": null,
                "is_pkg": true
            },
            {
                "product_id": 11568,
                "product_qty": "1",
                "product_price": "1000000.00",
                "stock": 26,
                "product_code1": "KDU",
                "product_name": "KARPET DASAR UNIVERSAL",
                "product_images": null,
                "is_pkg": false
            },
            {
                "product_id": 11934,
                "product_qty": "1",
                "product_price": "3400000.00",
                "stock": 2,
                "product_code1": "SLGBPLCFL",
                "product_name": "KACA FILM SOLARGARD LARGE CAR FULL",
                "product_images": null,
                "is_pkg": true
            },
            {
                "product_id": 12088,
                "product_qty": "1",
                "product_price": "2500000.00",
                "stock": 2,
                "product_code1": "80046",
                "product_name": "MIRAI CAM-3601",
                "product_images": null,
                "is_pkg": false
            },
            {
                "product_id": 13110,
                "product_qty": "1",
                "product_price": "6000000.00",
                "stock": 6,
                "product_code1": "NKMCL9MKIII4",
                "product_name": "NAKAMICHI HEAD UNIT LEGEND MK III 9 INCH 4/64",
                "product_images": null,
                "is_pkg": false
            },
            {
                "product_id": null,
                "product_qty": "1",
                "product_price": "1000000.00",
                "stock": 0,
                "product_code1": null,
                "product_name": "DOOR TRIM ARTICO LEDER ",
                "product_images": null,
                "is_pkg": false
            }
        ]
    },
    {
        "order_id": 64088,
        "order_no": "0000064088",
        "inv_no": null,
        "ref_id": null,
        "ref_no": null,
        "voucher_id": [],
        "voucher": null,
        "list": [
            {
                "product_id": 11931,
                "product_qty": "1",
                "product_price": "3100000.00",
                "stock": 5,
                "product_code1": "SLGBPMCFL",
                "product_name": "KACA FILM SOLARGARD MEDIUM CAR FULL",
                "product_images": null,
                "is_pkg": true
            }
        ],
        "order_draft_id": 62535
    },
    {
        "order_id": 65212,
        "order_no": null,
        "inv_no": null,
        "ref_id": null,
        "ref_no": null,
        "voucher_id": [],
        "voucher": null,
        "list": [
            {
                "product_id": 11807,
                "product_qty": "1",
                "product_price": "7000000.00",
                "stock": 11,
                "product_code1": "JKPAL3BMC",
                "product_name": "JOK PATEN ARTICOLEDER 3 BARIS (MEDIUM CAR)",
                "product_images": null,
                "is_pkg": true
            },
            {
                "product_id": 11568,
                "product_qty": "1",
                "product_price": "1000000.00",
                "stock": 26,
                "product_code1": "KDU",
                "product_name": "KARPET DASAR UNIVERSAL",
                "product_images": null,
                "is_pkg": false
            },
            {
                "product_id": 11934,
                "product_qty": "1",
                "product_price": "3400000.00",
                "stock": 2,
                "product_code1": "SLGBPLCFL",
                "product_name": "KACA FILM SOLARGARD LARGE CAR FULL",
                "product_images": null,
                "is_pkg": true
            },
            {
                "product_id": 12088,
                "product_qty": "1",
                "product_price": "2500000.00",
                "stock": 2,
                "product_code1": "80046",
                "product_name": "MIRAI CAM-3601",
                "product_images": null,
                "is_pkg": false
            },
            {
                "product_id": 12400,
                "product_qty": "1",
                "product_price": "2500000.00",
                "stock": 10,
                "product_code1": "80074",
                "product_name": "MIRAI MV-211D 1 INCH DVR DUAL CAMERA",
                "product_images": null,
                "is_pkg": false
            },
            {
                "product_id": 12381,
                "product_qty": "1",
                "product_price": "4500000.00",
                "stock": 27,
                "product_code1": "HUAADR9988",
                "product_name": "HEAD UNIT ANDROID ORCA NEW STANDARD 9\" ADR-9988",
                "product_images": null,
                "is_pkg": false
            }
        ]
    },
    {
        "order_id": 65216,
        "order_no": "0000065216",
        "inv_no": null,
        "ref_id": null,
        "ref_no": null,
        "voucher_id": [],
        "voucher": null,
        "list": [
            {
                "product_id": 11807,
                "product_qty": "1",
                "product_price": "7000000.00",
                "stock": 11,
                "product_code1": "JKPAL3BMC",
                "product_name": "JOK PATEN ARTICOLEDER 3 BARIS (MEDIUM CAR)",
                "product_images": null,
                "is_pkg": true
            },
            {
                "product_id": 11568,
                "product_qty": "1",
                "product_price": "1000000.00",
                "stock": 26,
                "product_code1": "KDU",
                "product_name": "KARPET DASAR UNIVERSAL",
                "product_images": null,
                "is_pkg": false
            },
            {
                "product_id": 11934,
                "product_qty": "1",
                "product_price": "3400000.00",
                "stock": 2,
                "product_code1": "SLGBPLCFL",
                "product_name": "KACA FILM SOLARGARD LARGE CAR FULL",
                "product_images": null,
                "is_pkg": true
            },
            {
                "product_id": 12088,
                "product_qty": "1",
                "product_price": "2500000.00",
                "stock": 2,
                "product_code1": "80046",
                "product_name": "MIRAI CAM-3601",
                "product_images": null,
                "is_pkg": false
            }
        ],
        "order_draft_id": 63652
    }
];

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
            if (customerId === 367) {
                return pendingOrder;
            }
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