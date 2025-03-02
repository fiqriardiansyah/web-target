import React from "react";
import { ConstantContext } from "./context";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { salesService } from "../services";

export type ConstantContextType = {
    paymentChannel: UseQueryResult<PaymentChannel[], Error>;
    ccPaymentChannel: UseQueryResult<PaymentChannel[], Error>;
}

export const ConstantProvider = ({ children }: { children: React.ReactElement }) => {

    const paymentChannel = useQuery({
        queryFn: async () => (await salesService.PaymentChannel({ is_cc: 0 })).data?.data,
        queryKey: [salesService.paymentChannel, 0],
    });

    const ccPaymentChannel = useQuery({
        queryFn: async () => (await salesService.PaymentChannel({ is_cc: 1 })).data?.data,
        queryKey: [salesService.paymentChannel, 1],
    });

    return (
        <ConstantContext.Provider value={{ paymentChannel, ccPaymentChannel }}>
            {children}
        </ConstantContext.Provider>
    )
}