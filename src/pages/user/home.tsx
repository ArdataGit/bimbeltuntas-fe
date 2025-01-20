import CKeditor from '@/components/ckeditor';
import { useHomeStore } from '@/stores/home-stores';
import { useAuthStore } from '@/stores/auth-store';
import { imageLink } from '@/utils/image-link';
import { IconBuildingBank } from '@tabler/icons-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Rate } from 'tdesign-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const data = useHomeStore((state) => state);
  const role = useAuthStore((state) => state?.user?.role);
  const socials = [
    {
      link: '#',
      icons: '/img/instagram.webp',
      text: 'tuntascpns',
    },
    {
      link: '#',
      icons: '/img/instagram.webp',
      className: 'size-7',
      text: 'tuntascbt',
    },
    {
      link: 'https://youtube.com/@bimbeltuntas?si=K3_bq0877F7q4xdl',
      icons: '/img/youtube.png',
      text: 'bimbeltuntas',
    },
  ];
  const groups = [
    {
      link: 'https://chat.whatsapp.com/KYwfjFtL7R1716LTeHCHhX',
      icons: '/img/whatsapp.webp',
      name: 'WhatsApp',
      className: 'bg-green-100 border border-green-500',
    },
    {
      link: 'https://t.me/+W7flyloqLMMyNDJl',
      icons: '/img/telegram.webp',
      name: 'Telegram',
      className: 'bg-blue-100 border border-blue-500',
    },
  ];

  return (
    <div className="w-[100%] overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        swipeable
        emulateTouch
        interval={10000}
        showArrows={false}
        showThumbs={false}
        className="p-5 rounded-sm"
      >
        {data?.section
          ?.filter((e: any) => e.tipe === 'BANNER')
          ?.map((e: any) => (
            <div
              className="cursor-grab"
              onClick={() => {
                if (e.url) window.open(e.url);
              }}
            >
              <img className="rounded-md" src={imageLink(e.gambar)} />
            </div>
          ))}
      </Carousel>
      {role !== 'USER' && (
        <div className="grid grid-cols-3 xl:grid-cols-3 gap-x-7 gap-y-7 mx-5">
          <div className="item-stat bg-white shadow rounded-2xl p-5">
            <div className="flex flex-row mb-7 justify-between">
              <div className="bg-violet-700 rounded-full w-fit p-3">
                <IconBuildingBank className="text-white" />
              </div>
            </div>
            <h3 className="text-2xl text-indigo-950 font-bold">{data?.soal}</h3>
            <p className="text-sm text-gray-500">Bank Soal</p>
          </div>

          <div className="item-stat bg-white shadow rounded-2xl p-5">
            <div className="flex flex-row mb-7 justify-between">
              <div className="bg-orange-500 rounded-full w-fit p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.17004 7.43994L12 12.5499L20.77 7.46991"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 21.6099V12.5399"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.92999 2.48L4.59 5.45003C3.38 6.12003 2.39001 7.80001 2.39001 9.18001V14.83C2.39001 16.21 3.38 17.89 4.59 18.56L9.92999 21.53C11.07 22.16 12.94 22.16 14.08 21.53L19.42 18.56C20.63 17.89 21.62 16.21 21.62 14.83V9.18001C21.62 7.80001 20.63 6.12003 19.42 5.45003L14.08 2.48C12.93 1.84 11.07 1.84 9.92999 2.48Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 13.24V9.58002L7.51001 4.09998"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl text-indigo-950 font-bold">
              {data?.pembelian}
            </h3>
            <p className="text-sm text-gray-500">Paket Tersedia</p>
          </div>
          <div className="item-stat bg-white rounded-2xl shadow p-5">
            <div className="flex flex-row mb-7 justify-between">
              <div className="bg-cyan-700 rounded-full w-fit p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2V5"
                    stroke="#fff"
                    strokeWidth="2"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V5"
                    stroke="#fff"
                    strokeWidth="2"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 13H15"
                    stroke="#fff"
                    strokeWidth="2"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 17H12"
                    stroke="#fff"
                    strokeWidth="2"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
                    stroke="#fff"
                    strokeWidth="2"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl text-indigo-950 font-bold">
              {data?.event}
            </h3>
            <p className="text-sm text-gray-500">Event</p>
          </div>
        </div>
      )}

      <div className="grid rounded-xl md:grid-cols-2 gap-2 ">
        {data?.section
          ?.filter((e: any) => e.tipe === 'CUSTOM')
          ?.map((e: any) => (
            <div
              className={`mx-5 mt-5 pb-10 px-10 shadow rounded-xl bg-indigo-900 text-white`}
            >
              <h3 className="pt-5 text-xl text-center font-medium mb-5">
                {e.title}
              </h3>
              <CKeditor
                content={e.keterangan}
                readOnly
                className="mb-5 inline-block w-full"
              />
            </div>
          ))}

        <div className="mx-5 ml-0 bg-white shadow  py-5 mt-5 flex flex-col text-center px-10 rounded-xl ">
          <div>
            <h1 className="text-lg font-medium">Ikuti Social Media</h1>
            <div className="flex gap-6 mt-3 flex-wrap items-center justify-center">
              {socials.map((link, i) => (
                <div key={i} className="text-center flex flex-col items-center">
                  <Link to={link.link}>
                    <img
                      src={link.icons}
                      className={`object-cover object-center ${
                        link.className ?? 'size-7'
                      }`}
                      alt=""
                    />
                  </Link>
                  {link.text && <p className="mt-2 text-sm">{link.text}</p>}
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-lg font-medium mt-8">Ikuti Grup Kami</h1>
              <div className="flex flex-col gap-2 mt-3 flex-wrap max-sm:justify-center items-center">
                {groups.map((link, i) => (
                  <Link
                    className={`flex gap-2 items-center justify-center gap-3 text-sm px-4 py-2 rounded-md border border-slate-300 w-full ${link?.className}`}
                    key={i}
                    to={link.link}
                  >
                    <h1>Group {link.name}</h1>
                    <img
                      src={link.icons}
                      className={`size-6 !min-w-5 object-cover object-center`}
                      alt=""
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {(data?.section?.filter((e: any) => e.tipe === 'REVIEW')?.length || 0) >
        0 && (
        <div className="mx-5 shadow bg-white mt-5 px-10 rounded-xl pb-20">
          <h3 className="pt-10 text-xl text-center font-medium">
            Apa kata para Alumni
          </h3>

          <div className="grid   rounded-xl md:mx-5 mt-10 md:grid-cols-2 gap-2 bg-white">
            {data?.section
              ?.filter((e: any) => e.tipe === 'REVIEW')
              ?.map((e: any) => (
                <figure
                  className={`flex flex-col items-center justify-center p-8 text-center  bg-white border-b border-gray-200  border rounded-xl`}
                >
                  <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                    <div className="flex justify-center mb-4">
                      <Rate value={e.bintang} disabled />
                    </div>
                    <CKeditor
                      content={e.keterangan}
                      readOnly
                      className="mb-5 inline-block w-full"
                    />
                  </blockquote>
                  <figcaption className="flex items-center justify-center ">
                    <img
                      className="rounded-full w-9 h-9"
                      src={imageLink(e.gambar)}
                      alt="profile picture"
                    />
                    <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                      <div>{e.title}</div>
                      <div className="text-sm text-gray-500 ">
                        {e.pekerjaan}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
