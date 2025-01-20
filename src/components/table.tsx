import { Table } from 'tdesign-react';

export default function TableWrapper({
  data,
  columns,
  onSelectChange,
  selectedRowKeys,
  ...props
}: any) {
  const onFilterChange = (filters: any) => {
    Object.keys(filters)?.forEach((key) => {
      if (!filters?.[key]) {
        delete filters?.[key];
      }
    });

    data.setParams((prev: any) => ({
      ...prev,
      filters,
    }));
  };

  const onSortChange = (sorter: any) => {
    if (!sorter) {
      data.setParams((prev: any) => ({
        ...prev,
        sortBy: 'createdAt',
        descending: true,
      }));
    } else {
      data.setParams((prev: any) => ({
        ...prev,
        descending: !sorter.descending,
        sortBy: sorter.sortBy,
      }));
    }
  };

  return (
    <div className="overflow-auto">
      <Table
        loading={data.isLoading}
        rowKey="key"
        data={
          onSelectChange
            ? data?.list?.map((item: any) => ({
                ...item,
                key: item.id,
                rowIndex: item.id,
              }))
            : data?.list
        }
        columns={columns}
        filterValue={data?.params?.filters ? data.params.filters : {}}
        // filterValue={data.params.filters}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        selectOnRowClick={true}
        selectedRowKeys={selectedRowKeys}
        {...props}
        onSelectChange={onSelectChange}
        className="table"
        pagination={{
          defaultCurrent: 1,
          total: data.count,
          showJumper: false,
          pageSizeOptions: [5, 10, 20, 100],
          onPageSizeChange: (pageSize: number) => {
            data.setParams((prev: any) => ({ ...prev, take: pageSize }));
          },
          onChange(pageInfo) {
            data.setParams((prev: any) => ({
              ...prev,
              skip: (pageInfo.current - 1) * pageInfo.pageSize,
            }));
          },
        }}
        lazyLoad
      />
    </div>
  );
}
