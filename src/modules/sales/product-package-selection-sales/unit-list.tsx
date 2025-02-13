import { useQuery } from "@tanstack/react-query";
import { MainCardProduct } from "../../../components";
import { useProductPackageContext } from "../../../hooks";
import { salesService } from "../../../services";
import React from "react";
import { Pagination, PaginationProps, Spin } from "antd";

export default function UnitList() {
    const { state: { query, store, products }, setState } = useProductPackageContext();
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        setPage(1);
    }, [query, store]);

    const productQuery = useQuery({
        queryFn: async () => {
            if (store) {
                return (await salesService.GetProductStore({ page, query: query })).data?.data;
            } else {
                return (await salesService.GetProduct({ page, query: query })).data?.data;
            }
        },
        queryKey: [store ? salesService.getProductStore : salesService.getProduct, page, query]
    });

    const onChangePage: PaginationProps['onChange'] = (page) => {
        setPage(page);
    };

    const onClickProduct = (prd: Product) => {
        return () => {
            setState((prev) => {
                if (prev?.products.find((p) => p.product_id === prd.product_id)) {
                    return { ...prev, products: prev?.products.filter((p) => p.product_id !== prd.product_id) }
                }
                return { ...prev, products: [...prev.products, prd] }
            })
        }
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="grid grid-cols-3 gap-3">
                {productQuery?.isPending && <div className="w-full flex items-center h-[150px] justify-center col-span-3">
                    <Spin size="large" />
                </div>}
                {productQuery.data?.product_list?.map((product) => {
                    if (products.find((p) => p.product_id === product.product_id)) {
                        return <div className="relative" key={product.product_id}>
                            <div className="bg-black/30 w-full rounded h-full absolute top-0 left-0 z-10 pointer-events-none flex items-center justify-center">
                                <div className="py-1 text-lg px-5 rounded bg-black/60 text-white font-semibold">
                                    Terpilih
                                </div>
                            </div>
                            <MainCardProduct.AsCard onClick={onClickProduct(product)} product={product} />
                        </div>
                    }
                    return <MainCardProduct.AsCard onClick={onClickProduct(product)} key={product.product_id} product={product} />
                })}
            </div>
            <Pagination defaultCurrent={1} current={page} showSizeChanger={false} onChange={onChangePage} total={productQuery.data?.total_data} pageSize={20} />
        </div>
    )
}