// import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import qoreContext from "../utils/qoreContext";
// import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

// component import example
// const Todo = dynamic(() => import("../components/Todo"), { ssr: false });

const UsersManagement = () => {
  const [id, setId] = useState("");
  const [detailView, setDetailView] = useState(false);

  const { data: allMembers } = qoreContext
    .view("allMember")
    .useListRow({ limit: 1000, order: "asc" }, { pollInterval: 500 });

  const deleteUser = qoreContext.view("allMember").useDeleteRow();
  const updateUserStatus = qoreContext.view("allMember").useUpdateRow();
  const updateUserRole = qoreContext.view("allMember").useUpdateRow();
  const { data: userDetails, status } = qoreContext
    .view("allMember")
    .useGetRow(id);

  const detailViewHandler = () => {
    setDetailView(!detailView);
  };

  const getDetailsUser = (id: string) => {
    console.log(id);
    console.log(userDetails, status);
    setId(id);
    detailViewHandler();
  };

  return (
    <>
      <Head>
        <title>CMS Teskarir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full bg-gray-50 flex justify-between h-full">
        <div className="w-1/4 bg-blue-800 h-full flex-col flex-start justify-center px-15 py-20">
          <h1 className="text-xl font-bold cursor-pointer text-left bg-transparent w-9/12 h-max px-10 py-10 text-white">
            Admin
            <br />
            Dashboard
          </h1>
          <ul className="h-screen justify-center min-w-max">
            <li className="m-10 cursor-pointer text-white">Home</li>
            <li className="m-10 cursor-pointer text-white">Users Management</li>
            <li className="m-10 cursor-pointer text-white">Tes Kuis</li>
            <li className="m-10 cursor-pointer text-white">Tentang Karir</li>
            <li className="m-10 cursor-pointer text-white">Logout</li>
          </ul>
        </div>

        <div className="w-9/12 min-h-full w-full bg-gray-50 h-24 min-h-0 md:min-h-48 lg:w-full justify-around items-center">
          <div className="container md:container justify-between flex flex-row items-center px-10">
            <h1 className="lg:text-xl sm:text-lg font-bold">
              Users Management
            </h1>

            <img
              src="http://teskarir.com/wp-content/uploads/2020/06/imageedit_17_9008611935-150x150.png"
              className="w-1/12"
            />
          </div>
          <div className="md:container md:mx-auto px-10 mt-10 bg-transparent overflow-scroll h-screen">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Email
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Role
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Username
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Domisili
                  </th>

                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Status
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allMembers.map((user, idUser) => (
                  <>
                    <tr
                      key={idUser}
                      className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                    >
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                          Email
                        </span>
                        {user.email}
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                          Role
                        </span>
                        <select
                          onClick={async (e) => {
                            await updateUserRole.updateRow(user.id, {
                              userRole: e.target.value,
                            });
                          }}
                        >
                          <option selected value={user.userRole}>
                            {user.userRole}
                          </option>
                          <option value="admin">admin</option>
                          <option value="kontributor">kontributor</option>
                          <option value="peserta">peserta</option>
                        </select>
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                          Username
                        </span>
                        {user.username}
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                          Domisili
                        </span>
                        {user.domicile}
                      </td>

                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                          status
                        </span>
                        {user.status == true ? <p>Actived</p> : <p>Suspend</p>}
                      </td>

                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                          Actions
                        </span>

                        <a
                          onClick={() => getDetailsUser(user.id)}
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                        >
                          Lihat Detail
                        </a>

                        <a
                          onClick={async () => {
                            await deleteUser.deleteRow(user.id);
                          }}
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                    {/* <p>{JSON.stringify(allMembers)}</p> */}
                  </>
                ))}
              </tbody>
            </table>

            {/* user detail modal */}
            <div>
              {detailView ? (
                <>
                  {userDetails ? (
                    <>
                      <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                          >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>

                          <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                          >
                            &#8203;
                          </span>
                          <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                          >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                  <div className="mt-2">
                                    <>
                                      <h1 className="text-lg font-bold mb-3">
                                        {userDetails.username}
                                      </h1>
                                      <h2 className="text-md">
                                        USER ID : {userDetails.id}
                                      </h2>
                                      <h3>Role : {userDetails.userRole}</h3>
                                      <p>Username : {userDetails.username}</p>
                                      <p>email : {userDetails.email}</p>
                                      <p>Domisili : {userDetails.domicile}</p>
                                      <p>
                                        Tanggal Lahir : {userDetails.birthDate}
                                      </p>
                                      <p>
                                        Status Akun :
                                        {userDetails.status ? (
                                          <span>Actived Account</span>
                                        ) : (
                                          <span>Suspend</span>
                                        )}
                                      </p>
                                    </>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button
                                onClick={async () => {
                                  await updateUserStatus.updateRow(
                                    userDetails.id,
                                    {
                                      status: !userDetails.status,
                                    }
                                  );
                                }}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                {userDetails.status ? (
                                  <span>Actived Account</span>
                                ) : (
                                  <span>Suspend</span>
                                )}
                              </button>
                              <button
                                onClick={() => detailViewHandler()}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersManagement;
