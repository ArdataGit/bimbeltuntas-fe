import BreadCrumb from '@/components/breadcrumb';
import CardProduct from '@/components/card-product';
import PaymentModal from '@/components/payment-modal';
import useGetList from '@/hooks/use-get-list';
import { getData } from '@/utils/axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PaketPembelian() {
  const [paymentModal, setPaymentModal] = useState(false);
  const [category, setCategory] = useState<{ nama: string }[]>([]);

  const [alumniVoucher, setAlumniVoucher] = useState({});
  const [itemDetail, setItemDetail] = useState({});

  const getClass = useGetList({
    url: 'user/tryout/my-tryout',
    initialParams: {
      skip: 0,
      take: 0,
      category: '',
    },
  });

  const getCategories = async () => {
    getData(`user/category/get`).then((res) => {
      setCategory(res);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getAlumniVoucher = async () => {
    getData(`user/get-voucher-alumni`).then((res) => {
      setAlumniVoucher(res);
    });
  };

  useEffect(() => {
    getAlumniVoucher();
  }, []);

  return (
    <div>
      {paymentModal && (
        <PaymentModal
          setVisible={setPaymentModal}
          itemDetail={itemDetail}
          alumniVoucher={alumniVoucher}
        />
      )}
      <BreadCrumb
        page={[{ name: 'Paket Pembelian', link: '/paket-pembelian' }]}
      />
      <div className="flex flex-col gap-y-5 md:flex-row md:items-center justify-start md:justify-between header-section w-full">
        <div className="title flex justify-between w-full">
          <h1 className="text-2xl text-indigo-900 font-bold mb-5">
            Paket Pembelian
          </h1>
          <Link
            to={'riwayat'}
            className="text-sm md:text-md text-blue-700  mb-5"
          >
            Riwayat Pembelian
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-3 mb-5 overflow-auto">
        <button
          className={` 
            py-3 px-6
            mb-5
            border 
            rounded
            mr-2
            text-primary
            border-indigo-900
            hover:bg-indigo-900
            hover:shadow-[5px_5px_rgba(63,81,181,0.27)]         
            ${
              getClass.params.category === ''
                ? ' shadow-[5px_5px_rgba(63,81,181,0.27)] bg-indigo-900 text-white'
                : ' bg-white'
            }   
            hover:text-white`}
          onClick={() => {
            getClass.setParams({
              ...getClass.params,
              category: '',
            });
          }}
        >
          Semua Kelas
        </button>
        {category?.map((item) => (
          <button
            onClick={() => {
              getClass.setParams({
                ...getClass.params,
                category: item?.nama,
              });
            }}
            className={`
          
            text-primary
            py-3 px-6
            mb-5

            border 
            rounded
            mr-2
            border-indigo-900
            hover:bg-indigo-900
            hover:shadow-[5px_5px_rgba(63,81,181,0.27)]         
            ${
              getClass.params.category === item.nama
                ? ' shadow-[5px_5px_rgba(63,81,181,0.27)] bg-indigo-900 text-white'
                : ' bg-white'
            }   
            hover:text-white`}
          >
            {item.nama}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {getClass?.list?.map((item) => (
          <CardProduct
            setVisible={setPaymentModal}
            item={item}
            alumniVoucher={alumniVoucher}
            setItemDetail={setItemDetail}
          />
        ))}
      </div>
    </div>
  );
}
