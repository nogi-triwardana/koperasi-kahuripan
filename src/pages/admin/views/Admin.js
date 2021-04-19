import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import CardTableAdmin from "../components/card/CardTableAdmin.js";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";

export default function DataAdmin() {
    const [open,setOpen] = React.useState(false);
    const [kolektor,setKolektor] = React.useState('');
    const [password,setPassword] = React.useState(''); 
    const [confirmPassword,setConfirmPassword] = React.useState('');
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [Notification,setNotification] = React.useState("");

    /*
    if(kolektor === "" || password === ""){
        alert("harap lengkapi nama anggota dan password")
      }
  
      if(password !== confirmPassword){
        alert("harap samakan password dengan konfirmasi password!")
      }
      else{

      }
    */
    return (
        <>
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
                <Modal open={open} onClose={onCloseModal}>
                    <div className="w-full max-w-md">
                        {Notification === "berhasil" ? <SuccessMessage /> : null}
                        {Notification === "gagal" ? <ErrorMessage /> : null}
                        <h3 className="text-center">Daftar Admin</h3>
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block">
                                    <span className="text-gray-700 text-sm font-bold mb-2">Nama Calon Admin : </span>
                                    <select className="form-select mt-1 block w-full rounded-lg" onChange={ (e) => setKolektor(e.target.value)} value={kolektor}>
                                    <option value=""></option>
                                    <option value="sadikin">Ny.Sadikin</option>
                                    <option value="neneng">Ny.Neneng</option>
                                    <option value="fina">Ny.Fina</option>
                                    </select>
                                </label>
                            </div>
                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-bold mb-2">Password : </label>
                                <input onChange={ (e) => setPassword(e.target.value) }
                                    className="w-full rounded-lg border-2"
                                    type="password"
                                    id="password"
                                    name="password" 
                                />
                            </div>
                            <div className="mb-6">
                            <label className="text-gray-700 text-sm font-bold mb-2">Konfirmasi Password : </label>
                            <input
                                onChange={ (e) => setConfirmPassword(e.target.value) }
                                className="w-full rounded-lg border-2"
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                            />
                        </div> 
                        <div className="flex items-center justify-between">
                        <button className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Tambah
                        </button>
                        </div>
                    </form>
                    </div>
                </Modal>
                <button
                    className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center"
                    onClick={onOpenModal}
                >
                    <img 
                        src={require("./../../../assets/admin/icon/add.png").default}
                        className="w-btn-add mr-1"
                        alt=""
                    />
                    Tambah
                </button>
                <button
                className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-blue-700 hover:text-gray-200 py-2 px-4 ml-4 mb-2 rounded inline-flex items-center"
                type="button"
                >
                <img 
                src={require("./../../../assets/admin/icon/pdf.png").default}
                className="w-btn-add mr-1"
                alt=""
                />
                    Generate PDF
                </button>
            <CardTableAdmin color="light" />
            </div>
        </div>
        </>
    );
}