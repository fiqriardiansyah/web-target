import React from "react";

interface Props {
    children: React.ReactNode;
    data: boolean;
    isLoading: boolean;
    isError?: boolean;
    isEmpty?: boolean;
}

const StateRenderContext = React.createContext<Partial<Props>>({});
StateRenderContext.displayName = "StateRenderContext";

const useStateRender = () => {
    const context = React.useContext(StateRenderContext);
    return context;
};

function Empty({ children }: { children: React.ReactNode }) {
    const { isEmpty } = useStateRender();
    if (isEmpty) return children;
    return null;
}

function Loading({ children }: { children: React.ReactNode }) {
    const { isLoading } = useStateRender();
    if (isLoading) return children;
    return null;
}

function Error({ children }: { children: React.ReactNode }) {
    const { isError } = useStateRender();
    if (isError) return children;
    return null;
}

function Data({ children }: { children: React.ReactNode }) {
    const { data } = useStateRender();
    if (data) return children;
    return null;
}

function StateRender({ children, data, isLoading, isError, isEmpty }: Props) {
    const value = React.useMemo(() => ({ data, isLoading, isError, isEmpty }), [data, isLoading, isError, isEmpty]);
    return <StateRenderContext.Provider value={value}>{children}</StateRenderContext.Provider>;
}

StateRender.Loading = Loading;
StateRender.Error = Error;
StateRender.Data = Data;
StateRender.Empty = Empty;

export default StateRender;
