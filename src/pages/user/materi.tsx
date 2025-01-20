import BreadCrumb from '@/components/breadcrumb';
import { getData } from '@/utils/axios';
import { IconBook, IconFiles } from '@tabler/icons-react';
import { useEffect, useState, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

const CardTryout = ({ data }: any) => (
  <div className="bg-white p-6 w-full rounded-lg shadow-lg">
    <div className="text-center text-lg md:text-2xl mb-2 md:mb-2 font-semibold">
      {data.nama}
    </div>
    <div className="h-0.5 md:h-1 w-2/3 bg-tertiary mx-auto mb-6"></div>
    <div className="flex flex-col mb-8 justify-center items-center gap-3">
      <div className="flex gap-2 ">
        <IconFiles className="" />
        File dapat diunduh
      </div>
      <div className="flex gap-2 ">
        <IconBook className="" />
        Materi dapat langsung dibaca
      </div>
    </div>
    <div className="grid grid-cols-1 items-center gap-2">
      <Link
        to={data.link}
        className="w-full bg-indigo-900 text-white  py-2 rounded-md transition-all hover:bg-indigo-900 text-center"
      >
        Lihat Materi
      </Link>
    </div>
  </div>
);

export default function Materi() {
  const [data, setData] = useState<any>({});
  const { id } = useParams();

  const getDetailClass = async () => {
    getData(`user/find-my-class/${id}`).then((res) => {
      if (res.error) window.location.href = '/paket-pembelian';
      setData({ ...res, materi: res?.paketPembelian?.paketPembelianMateri });
    });
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getDetailClass();
  }, []);

  const getCategory = async () => {
    const data = await getData('user/paket-pembelian/get-category');
    setCategory(data);
    if (!searchParams.get('category')) {
      setSearchParams({ category: data[0]?.category });
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const mappedCategories = useMemo(() => {
    return [...new Set(data?.paketPembelian?.paketPembelianMateri?.map((materi: any) => materi.category) || [])];
  }, [data, category])

  return (
    <div>
      <BreadCrumb
        page={[
          { name: 'Paket saya', link: '/my-class' },
          {
            name: data?.paketPembelian?.nama || 'Nama Kelas',
            link: '/my-class',
          },
          { name: 'Materi', link: '#' },
        ]}
      />
      <h1 className="self-center text-2xl text-indigo-950 font-bold text-center mb-5">
        Materi {data?.paketPembelian?.nama}
      </h1>
      <div>
        <div className="w-full flex">
          {mappedCategories?.map((item: any) => (
            <button
              onClick={() => {
                setSearchParams({ category: item });
              }}
              className={`
          
            text-gray-700 
            py-2 px-8
            mb-5

            border 
            rounded
            mr-4
            border-indigo-900
            hover:bg-indigo-900
            hover:shadow-[5px_5px_rgba(63,81,181,0.27)]         
             ${
               searchParams.get('category') === item
                 ? ' shadow-[5px_5px_rgba(63,81,181,0.27)] bg-indigo-900 text-white'
                 : ' bg-white'
             }  
              
            hover:text-white`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 mt-4">
          {data?.materi
            ?.filter(
              (item: any) => item.category === searchParams.get('category')
            )
            .map((item: any, index: number) => (
              <CardTryout key={index} data={item} id={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
