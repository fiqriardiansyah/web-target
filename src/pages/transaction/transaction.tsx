import { useMutation } from "@tanstack/react-query";
import { Alert, Pagination, PaginationProps } from "antd";
import React from "react";
import { ButtonTransaction, Loading, StateRender } from "../../components";
import { useNavbarContext } from "../../hooks";
import transactionService from "../../services/transaction/transaction";

import FilterSvg from '../../asset/filter.svg';
import { ModalFilterTransaction } from "../../modules";
import { FilterTransactionSchema } from "../../schema";
import { useNavigate } from "react-router-dom";

export default function Transaction() {
    const navigate = useNavigate();
    const { setExtraComponent } = useNavbarContext();
    const [pageSize, setPageSize] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const refButtonOpenModal = React.useRef<HTMLButtonElement | null>(null);

    const transactionMutate = useMutation({
        mutationFn: async (param?: FilterTransactionSchema) => {
            if (param?.startDate || param?.endDate) {
                return (await transactionService.ListTransactionFilter({
                    start_date: param?.startDate,
                    end_date: param?.endDate,
                })).data?.data
            }
            return (await transactionService.ListTransaction()).data?.data;
        },
    });

    const onChangePage: PaginationProps['onChange'] = (page) => {
        setPage(page);
    };

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setPageSize(pageSize);
        setPage(current);
    };

    const transactionCurrentPage = transactionMutate.data?.slice((page - 1) * pageSize, page * pageSize);

    React.useEffect(() => {
        transactionMutate.mutate(undefined);
        setExtraComponent(() => (
            <button onClick={() => refButtonOpenModal.current?.click()} className="cursor-pointer" title="Filter list">
                <img src={FilterSvg} className="w-10" alt="" />
            </button>
        ));

        return () => {
            setExtraComponent(undefined);
        }
    }, []);

    return (
        <>
            <ModalFilterTransaction onSubmit={(dt) => transactionMutate.mutate(dt)}>
                {(ctrl) => (
                    <button ref={refButtonOpenModal} onClick={ctrl.openModal} className="hidden">open modal</button>
                )}
            </ModalFilterTransaction>
            <div className="container-custom flex flex-col gap-3 pb-10">
                <StateRender
                    data={!!transactionMutate.data?.length}
                    isLoading={transactionMutate.isPending}
                    isError={transactionMutate.isError}
                    isEmpty={!transactionMutate.data?.length && !transactionMutate.isError && !transactionMutate.isPending}>
                    <StateRender.Data>
                        {transactionCurrentPage?.map((transaction) => (
                            <ButtonTransaction onClick={() => navigate('/transaction/' + transaction.id)} key={transaction.id} transaction={transaction} />
                        ))}
                        <div className="w-full flex justify-end">
                            <Pagination
                                defaultCurrent={1}
                                current={page}
                                onChange={onChangePage}
                                onShowSizeChange={onShowSizeChange}
                                total={transactionMutate.data?.length}
                                pageSize={pageSize}
                                className="!mt-5" />
                        </div>
                    </StateRender.Data>
                    <StateRender.Loading>
                        <Loading />
                    </StateRender.Loading>
                    <StateRender.Error>
                        <Alert type="error" message={(transactionMutate.error)?.message} />
                    </StateRender.Error>
                    <StateRender.Empty>
                        <div className="w-full h-[200px] flex items-center justify-center">
                            <h1>Tidak ada data</h1>
                        </div>
                    </StateRender.Empty>
                </StateRender>
            </div>
        </>
    )
}