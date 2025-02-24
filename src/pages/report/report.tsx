import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Tooltip } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ButtonPrint, ControlledDate } from "../../components";
import { reportFilterSchema, ReportFilterSchema } from "../../schema";
import reportTransaction from "../../services/report/report";
import { formatCurrency } from "../../utils";

export default function Report() {
    const colors = ["#55BCBE", "#BAEEF1", "#6AE7FC"];

    const reportMutation = useMutation({
        mutationFn: async (data: SalesPerformanceReport) => (await reportTransaction.SalesPerformance({ ...data, type: 2 })).data?.data,
    });

    const { control, handleSubmit } = useForm<ReportFilterSchema>({
        mode: 'onChange',
        resolver: zodResolver(reportFilterSchema),
    });

    const onSubmitForm = (data: ReportFilterSchema) => {
        reportMutation.mutate({ end_date: data.endDate, start_date: data.startDate });
    };

    const dataChart = reportMutation.data?.map((el, i) => ({ ...el, fill: colors[i % colors.length] }));

    React.useEffect(() => {
        reportMutation.mutate({});
    }, []);

    return (
        <div className="container-custom flex flex-col gap-4 pb-10">
            <div className="w-full flex items-center gap-10 justify-between">
                <Form layout="vertical" className="w-full flex items-start gap-3 my-4" onFinish={handleSubmit(onSubmitForm)}>
                    <ControlledDate label="Start Date" name="startDate" inputProps={{ placeholder: 'Pilih tanggal mulai', size: 'large' }} control={control} />
                    <ControlledDate label="End Date" name="endDate" inputProps={{ placeholder: 'Pilih tanggal akhir', size: 'large' }} control={control} />
                    <Button loading={reportMutation.isPending} type="primary" size="large" htmlType="submit" className="w-full mt-[30px]">TAMPILKAN</Button>
                </Form>
                <ButtonPrint text="Print Laporan" />
            </div>
            <div className="w-full text-center text-xl my-5 text-gray-600">Sales Performance</div>
            <ResponsiveContainer minWidth={500} minHeight={500}>
                <BarChart data={dataChart} margin={{ left: 60 }}>
                    <CartesianGrid />
                    <XAxis dataKey="sales_name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value as number)} fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="total_price">
                        <LabelList dataKey="total_price" position="top" content={({ x, y, value }) => (
                            <text x={x} y={y} dy={-10} textAnchor="start" fill="black" fontSize={14}>
                                {formatCurrency(value as number)}
                            </text>
                        )} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}