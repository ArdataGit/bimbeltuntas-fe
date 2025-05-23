import Form from '@/components/form';
import Input from '@/components/input';
import { getData, patchData, postData } from '@/utils/axios';
import FetchAPI from '@/utils/fetch-api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Dialog } from 'tdesign-react';

export default function ManagePaketPembelian({
  setVisible,
  params,
  detail,
  setDetail,
}: any) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    const data = await getData('admin/paket-pembelian-materi/get-category');
    setCategory(data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (data: any) => {
    setLoading(true);

    const payload = {
      ...data,
      paketPembelianId: Number(id),
    };

    FetchAPI(
      detail.id
        ? patchData(`admin/paket-pembelian-materi/update/${detail.id}`, payload)
        : postData('admin/paket-pembelian-materi/insert', payload)
    )
      .then(() => {
        params.refresh();
        getCategory();
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

  return (
    <Dialog
      header={detail.id ? 'Edit Materi ' : 'Tambah Materi '}
      visible
      onClose={handleClose}
      className="w-[800px]"
      footer={null}
    >
      <Form
        onSubmit={handleSubmit}
        className="space-y-6 "
        defaultValues={detail}
      >
        <Input
          title="Judul"
          name="nama"
          type="text"
          validation={{
            required: 'Judul tidak boleh kosong',
          }}
        />
        <Input title="Link Materi (PDF/Lain)" name="link" type="text" />
        <Input title="Materi" name="materi" type="ckeditor" />
        <Input
          title="Kategori"
          name="category"
          type="selectCreatable"
          options={category?.map((item: any) => ({
            value: item.category,
            label: item.category,
          }))}
        />{' '}
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
