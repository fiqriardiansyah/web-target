import { DownOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { salesService } from "../../services";
import { useSalesContext } from "../../hooks";

export default function SearchSales() {
    const { setState, state: { sales } } = useSalesContext();

    const salesQuery = useQuery({
        queryFn: async () => (await salesService.SearchSales()).data?.data,
        queryKey: [salesService.searchSales]
    });

    const salesName = salesQuery.data?.map((s) => ({ label: s.name, value: s.id }));

    return (
        <Select
            value={sales?.id}
            onChange={(val) => setState((prev) => ({ ...prev, sales: salesQuery.data?.find((s) => s.id === val) }))}
            loading={salesQuery.isLoading}
            className="w-full"
            size="large"
            suffixIcon={<DownOutlined />}
            showSearch
            placeholder="Pilih Customer"
            optionFilterProp="label"
            options={salesName}
        />
    )
}