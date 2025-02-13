import React from "react";
import { useProductPackageContext } from "../../../hooks";
import { useQuery } from "@tanstack/react-query";
import { salesService } from "../../../services";
import { Pagination, PaginationProps, Spin } from "antd";
import { PackageProduct } from "../../../components";

export default function PackageList() {

    const { state: { query, store, packages }, setState } = useProductPackageContext();
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        setPage(1);
    }, [query, store]);

    const packageQuery = useQuery({
        queryFn: async () => {
            if (store) {
                return (await salesService.GetPackageStore({ page, query: query })).data?.data;
            } else {
                return (await salesService.GetPackage({ page, query: query })).data?.data;
            }
        },
        queryKey: [store ? salesService.getPackageStore : salesService.getPackage, page, query]
    });

    const onChangePage: PaginationProps['onChange'] = (page) => {
        setPage(page);
    };

    const onClickPackage = (prd: ProductPackage) => {
        return () => {
            setState((prev) => {
                if (prev?.packages.find((p) => p.product_id === prd.product_id)) {
                    return { ...prev, packages: prev?.packages.filter((p) => p.product_id !== prd.product_id) }
                }
                return { ...prev, packages: [...prev.packages, prd] }
            })
        }
    }

    return (
        <div className="flex flex-col gap-5">
            {packageQuery?.isPending && <div className="w-full flex items-center h-[150px] justify-center col-span-3">
                <Spin size="large" />
            </div>}
            {packageQuery.data?.product_list?.map((item) => {
                if (packages.find((p) => p.product_id === item.product_id)) {
                    return <div className="relative" key={item.product_id}>
                        <div className="bg-black/30 w-full rounded h-full absolute top-0 left-0 z-10 pointer-events-none flex items-center justify-center">
                            <div className="py-1 text-lg px-5 rounded bg-black/60 text-white font-semibold">
                                Terpilih
                            </div>
                        </div>
                        <PackageProduct.AsCard onClick={onClickPackage(item)} productPackage={item} />
                    </div>
                }
                return <PackageProduct.AsCard onClick={onClickPackage(item)} key={item.product_id} productPackage={item} />
            })}
            <Pagination defaultCurrent={1} current={page} showSizeChanger={false} onChange={onChangePage} total={packageQuery.data?.total_data} pageSize={20} />
        </div>
    )
}