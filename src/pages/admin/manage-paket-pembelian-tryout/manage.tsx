import Form from '@/components/form';
import Input from '@/components/input';
import useGetList from '@/hooks/use-get-list';
import { patchData, postData } from '@/utils/axios';
import FetchAPI from '@/utils/fetch-api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Dialog, TagInput } from 'tdesign-react';

export default function ManagePaketPembelian({
  setVisible,
  params,
  detail,
  setDetail,
}: any) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (data: any) => {
    setLoading(true);

    delete data.bankSoalCategory;

    const payload = {
      ...data,
      startDate: data.jadwalTryout?.[0],
      endDate: data.jadwalTryout?.[1],
      paketPembelianId: Number(id),
      category: category.join(','),
    };

    delete payload.jadwalTryout;
    if (!payload.startDate) delete payload.startDate;
    if (!payload.endDate) delete payload.endDate;

    FetchAPI(
      detail.id
        ? patchData(`admin/paket-pembelian-tryout/update/${detail.id}`, payload)
        : postData('admin/paket-pembelian-tryout/insert', payload)
    )
      .then(() => {
        params.refresh();
        setVisible(false);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setVisible(false);
    setDetail({});
  };
  const listCategory = useGetList({
    url: 'admin/paket-latihan/get',
    initialParams: {
      skip: 0,
      take: 0,
      sortBy: 'createdAt',
      descending: true,
    },
  });

  const filteredList = listCategory?.list?.map((item: any) => ({
    label: item?.nama,
    value: item?.id,
  }));

  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    setCategory(detail?.category ? detail?.category?.split(',') : []);
  }, [detail?.category]);

  return (
    <Dialog
      header={detail.id ? 'Edit Tryout ' : 'Tambah Tryout '}
      visible
      onClose={handleClose}
      className="w-[800px]"
      footer={null}
    >
      <Form
        onSubmit={handleSubmit}
        className="space-y-6 "
        defaultValues={detail}
        disabledEnter
      >
        <Input
          title="Kategori Bank Soal"
          name="paketLatihanId"
          containerClass=""
          type="select"
          validation={{
            required: 'Paket Latihan tidak boleh kosong',
          }}
          options={filteredList}
        />{' '}
        <div className="">
          <label
            className={`block text-sm font-medium leading-6 text-gray-900 `}
          >
            Kategori Tryout
          </label>
          <TagInput
            autoWidth={false}
            clearable
            defaultInputValue=""
            className="border border-gray-300 py-1 px-2 rounded-md"
            value={category}
            onChange={(e) => {
              setCategory(e);
            }}
            dragSort
            excessTagsDisplayType="break-line"
            minCollapsedNum={0}
            placeholder={'Kategori (Ketik & Enter)'}
            readonly={false}
            size="medium"
          />
        </div>
       
        <Input
          title="Tipe Tryout"
          name="type"
          type="select"
          options={[
            {
              label: 'Tryout',
              value: 'TRYOUT',
            },
            {
              label: 'Pendahuluan',
              value: 'PENDAHULUAN',
            },
            {
              label: 'Pemantapan',
              value: 'PEMANTAPAN',
            },
            {
              label: 'Latihan',
              value: 'LATIHAN',
            },
          ]}
        />{' '}
        <Input
          title="Maksimal Tryout"
          name="limit"
          type="number"
          min={0}
          validation={{
            min: {
              value: 0,
              message: 'Limit tidak boleh kurang dari 0',
            },
          }}
        />
        <Input
          title="Jadwal Tryout"
          name="jadwalTryout"
          type="rangeDatePicker"
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            size="large"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="submit" size="large" loading={loading}>
            Submit
          </Button>
        </div>
      </Form>
    </Dialog>
  );
}
