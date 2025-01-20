import TableWrapper from "@/components/table";
import useGetList from "@/hooks/use-get-list";
import {
	IconFileSpreadsheet,
	IconPencil,
	IconPlus,
	IconTableImport,
	IconTrash,
} from "@tabler/icons-react";
import moment from "moment";
import { useEffect, useState } from "react";
import {
	Alert,
	Button,
	DateRangePickerPanel,
	Dialog,
	Popconfirm,
	Select,
	Upload,
} from "tdesign-react";
// import FetchAPI from '@/utils/fetch-api';
// import { deleteData } from '@/utils/axios';
import BreadCrumb from "@/components/breadcrumb";
import ManageUser from "./manage";
import { deleteData, getData, getExcel, postData } from "@/utils/axios";
import FetchAPI from "@/utils/fetch-api";
import { imageLink } from "@/utils/image-link";
import { useAuthStore } from "@/stores/auth-store";

enum FilterType {
	Input = "input",
}
enum AlignType {
	Center = "center",
	Left = "left",
	Right = "right",
}

interface Paket {
	id: number; // ID dari paket
	nama: string; // Nama paket
}

export default function UserIndex() {
	const [visible, setVisible] = useState(false);
	const [detail, setDetail] = useState({});
	const [paketList, setPaketList] = useState<Paket[]>([]); // Tentukan tipe data

	const dataUser = useGetList({
		url: "admin/users/get",
		initialParams: {
			skip: 0,
			take: 10,
		},
	});

	useEffect(() => {
		async function getPaketList() {
			const response = await getData("admin/users/packages/get");
			if (response) {
				setPaketList(response); // Simpan ke state
			}
		}

		getPaketList();
	}, []);

	// const handleDeleteNoPurchases = async () => {
	// 	try {
	// 		const confirmation = window.confirm(
	// 			"Apakah Anda yakin ingin menghapus semua user tanpa pembelian?",
	// 		);
	// 		if (!confirmation) return;

	// 		const response = await deleteData("admin/users/delete-no-purchases");
	// 		console.log(response); // Log pesan berhasil

	// 		// Refresh data tabel setelah penghapusan
	// 		dataUser.refresh();
	// 		alert("Semua user tanpa pembelian berhasil dihapus");
	// 	} catch (error) {
	// 		console.error("Error deleting users without purchases:", error);
	// 		alert("Terjadi kesalahan saat menghapus user tanpa pembelian");
	// 	}
	// };

	const handleDeleteFilteredData = async () => {
		try {
			const confirmation = window.confirm(
				"Apakah Anda yakin ingin menghapus semua data yang sesuai dengan filter?",
			);
			if (!confirmation) return;

			// Kirim filter yang aktif ke backend
			const response = await deleteData("admin/users/delete-filtered", {
				filters: dataUser.params.filters, // Kirim filter yang sedang aktif
			});

			console.log(response.message); // Log pesan berhasil

			// Refresh data tabel setelah penghapusan
			dataUser.refresh();
			alert("Semua data yang sesuai dengan filter berhasil dihapus");
		} catch (error) {
			console.error("Error deleting filtered data:", error);
			alert("Terjadi kesalahan saat menghapus data");
		}
	};

	const handleDeleted = async (id: any) => {
		FetchAPI(
			postData(`admin/users/remove`, {
				ids: id,
			}),
		).then(() => {
			dataUser.refresh();
		});
	};
	const handleExportExcel = async () => {
		await getExcel("admin/users/excel", "users");
	};

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const onSelectChange = (value: any, { selectedRowData }: any) => {
		console.log(value, selectedRowData);
		setSelectedRowKeys(value);
	};

	const columns = [
		{
			colKey: "applicant",
			title: "#",
			width: 60,
			cell: (row: any) => {
				return <span>{row.rowIndex + 1 * dataUser.params.skip + 1}</span>;
			},
		},
		{
			colKey: "key",
			type: "multiple",
			width: 50,
		},
		{
			title: "Name",
			colKey: "name",
			filter: {
				type: FilterType.Input,
				resetValue: "",
				confirmEvents: ["onEnter"],
				props: { placeholder: "Input Name" },
				showConfirmAndReset: true,
			},
		},
		{
			title: "Email",
			colKey: "email",
			filter: {
				type: FilterType.Input, // Using the enum here
				resetValue: "",
				confirmEvents: ["onEnter"],
				props: { placeholder: "Input Email" },
				showConfirmAndReset: true,
			},
		},
		{
			title: "Nomor Whatsapp",
			colKey: "noWA",
			filter: {
				type: FilterType.Input, // Using the enum here
				resetValue: "",
				confirmEvents: ["onEnter"],
				props: { placeholder: "Input noWA" },
				showConfirmAndReset: true,
			},
		},

		{
			title: "jumlah pembelian",
			align: "center",
			colKey: "jumlahPaketPembelian",
			cell: ({ row }: any) => {
				return <span>{row.Pembelian.length}</span>;
			},
			filter: {
				type: FilterType.Input,
				resetValue: "",
				confirmEvents: ["onEnter"],
				props: { placeholder: "Minimum Jumlah Pembelian" },
				showConfirmAndReset: true,
			},
		},
		{
			title: "Tanggal Mendaftar",
			colKey: "createdAt",
			sorter: true,
			align: "center",
			filter: {
				type: "custom" as FilterType,
				component: DateRangePickerPanel,
				props: {
					firstDayOfWeek: 7,
				},
				style: { fontSize: "14px" },
				classNames: "custom-class-name",
				attrs: { "data-type": "DateRangePickerPanel" },
				showConfirmAndReset: true,
				resetValue: [],
			},
			cell: ({ row }: any) => {
				return <span>{moment(row.createdAt).format("DD/MM/YYYY")}</span>;
			},
		},
		{
			title: "Action",
			align: AlignType.Center,
			colKey: "action",
			cell: ({ row }: any) => {
				return (
					<div className="flex justify-center gap-5">
						<Button
							shape="circle"
							theme="default"
							onClick={() => {
								setDetail(() => ({
									...row,
									password: "",
								}));
								setVisible(true);
							}}>
							<IconPencil size={14} />
						</Button>
						<Popconfirm
							content="Apakah kamu yakin ?"
							theme="danger"
							onConfirm={() => handleDeleted([row.id])}>
							<Button
								shape="circle"
								theme="danger">
								<IconTrash size={14} />
							</Button>{" "}
						</Popconfirm>
					</div>
				);
			},
		},
	];

	const token = useAuthStore.getState().token
		? useAuthStore.getState().token
		: "";

	const [uploadStatus, setUploadStatus] = useState({
		status: "",
		erorrList: [],
	});

	const [showModal, setShowModal] = useState(false);
	const [expandedRowKeys, setExpandedRowKeys] = useState(["2"]);

	const rehandleExpandChange = (value: any, params: any) => {
		setExpandedRowKeys(value);
		console.log("rehandleExpandChange", value, params);
	};

	const expandedRow = ({ row }: any) => (
		<div className="more-detail">
			<p className="title">
				<b>Paket Pembelian:</b>
			</p>
			<ul className="list-disc ml-4">
				{row.Pembelian.map((item: any, index: number) => (
					<li key={index}>
						{item?.paketPembelian?.nama} - {item?.status} -{" "}
						{moment(item?.createdAt).format("DD MMMM YYYY")}
					</li>
				))}
			</ul>
			<br />
		</div>
	);

	return (
		<section className="">
			<Dialog
				visible={showModal}
				header="Import User"
				onClose={() => setShowModal(false)}
				className="w-[800px]"
				footer={null}>
				<ol className="list-decimal list-inside">
					<li>
						<a
							href={imageLink("public/user.xlsx")}
							className="text-blue-500"
							download>
							Download template
						</a>{" "}
						excel
					</li>
					<li>Isi data sesuai dengan template</li>
					<li>Upload Kembali file excel</li>
				</ol>

				<Upload
					showUploadProgress
					className="mt-4 mb-2"
					theme="file"
					headers={{
						Authorization: `Bearer ${token}`,
					}}
					useMockProgress
					action={imageLink(`api/admin/users/import`)}
					method="POST"
					files={[]}
					onSuccess={() => {
						dataUser.refresh();
						setUploadStatus({
							status: "SUCCESS",
							erorrList: [],
						});
					}}
					onFail={(res: any) => {
						setUploadStatus({
							status: "ERROR",
							erorrList: JSON.parse(res.XMLHttpRequest?.responseText)?.error,
						});
					}}
				/>
				<span className="text-xs">
					<span className="text-red-500">*</span> gunakan tanda "|" untuk
					membuat paket pembelian lebih dari satu contoh: 1|2|3
				</span>
				{uploadStatus.status === "ERROR" && (
					<Alert
						theme="error"
						message={
							<ol className=" list-disc list-inside">
								{uploadStatus.erorrList.map((item: any) => (
									<li>{item}</li>
								))}
							</ol>
						}
					/>
				)}

				{uploadStatus.status === "SUCCESS" && (
					<Alert
						theme="success"
						message="Berhasil Melakukan Import"
					/>
				)}
			</Dialog>
			{visible && (
				<ManageUser
					setDetail={setDetail}
					params={dataUser}
					setVisible={setVisible}
					detail={detail}
				/>
			)}
			<BreadCrumb
				page={[{ name: "Manage Voucher", link: "/manage-voucher" }]}
			/>
			<div className="bg-white p-8 rounded-2xl min-w-[400px]">
				<div className="flex flex-col gap-y-5 md:flex-row md:items-center justify-start md:justify-between header-section w-full">
					<div className="title border-b border-[#ddd] w-full flex justify-between">
						<h1 className="text-2xl text-indigo-950 font-bold mb-5 ">
							Manage User
						</h1>
						<div className="flex items-center gap-4 mb-4">
							<Select
								options={[
									{ label: "Semua Paket", value: "ALL" }, // Opsi untuk membersihkan filter
									{ label: "Tidak Membeli Paket", value: "NO_PACKAGE" }, // Opsi untuk tidak membeli paket
									...paketList.map((paket) => ({
										label: paket.nama, // Nama paket
										value: paket.id, // ID paket
									})),
								]}
								onChange={(value) => {
									if (value === "ALL") {
										dataUser.applyFilter({ filters: {} }); // Bersihkan semua filter
									} else if (value === "NO_PACKAGE") {
										dataUser.applyFilter({ filters: { hasPurchase: false } }); // Filter user tanpa pembelian
									} else {
										dataUser.applyFilter({ filters: { packageId: value } }); // Filter user berdasarkan paket
									}
									dataUser.refresh(); // Refresh tabel
								}}
								placeholder="Pilih Paket Pembelian"
							/>
						</div>

						<div className="flex gap-3">
							<Popconfirm
								content="Apakah kamu yakin ?"
								theme="danger"
								onConfirm={() => handleDeleted(selectedRowKeys)}>
								<Button
									theme="danger"
									size="large"
									disabled={selectedRowKeys.length === 0}
									variant="dashed"
									className="hover:shadow-xl">
									<IconTrash size={20} />
								</Button>
							</Popconfirm>
							<Button
								theme="success"
								size="large"
								variant="dashed"
								onClick={handleExportExcel}
								className="hover:shadow-xl">
								<IconTableImport
									size={20}
									className=""
								/>
							</Button>

							<Button
								theme="primary"
								size="large"
								variant="dashed"
								onClick={() => setShowModal(true)}
								className="hover:shadow-xl">
								<IconFileSpreadsheet
									size={20}
									className=""
								/>
							</Button>
							<Button
								theme="default"
								size="large"
								className="border-success hover:bg-success hover:text-white group hover:shadow-xl"
								onClick={() => setVisible(true)}>
								<IconPlus
									size={20}
									className="text-success group-hover:text-white"
								/>
							</Button>
							{/* <Button
								theme="danger"
								size="large"
								onClick={() => handleDeleteNoPurchases()}>
								Hapus User Tanpa Pembelian
							</Button> */}
							<Button
								theme="danger"
								size="large"
								onClick={() => handleDeleteFilteredData()}>
								Hapus Data Filter
							</Button>
						</div>
					</div>
				</div>
				<TableWrapper
					data={dataUser}
					columns={columns}
					selectOnRowClick={true}
					selectedRowKeys={selectedRowKeys}
					onSelectChange={onSelectChange}
					expandedRowKeys={expandedRowKeys}
					expandedRow={expandedRow}
					expandOnRowClick={true}
					// expandIcon={IconExpand}
					onExpandChange={rehandleExpandChange}
				/>
			</div>
		</section>
	);
}
