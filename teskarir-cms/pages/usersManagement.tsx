// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
import Head from "next/head";
import React, { useState } from "react";
import qoreContext from "../utils/qoreContext";
// import ReactPaginate from "react-paginate";

// component import example
// const Todo = dynamic(() => import("../components/Todo"), { ssr: false });

const UsersManagement = () => {
  const [id, setId] = useState("52462423-356c-4749-8f1d-d752a620960f");
  const [detailView, setDetailView] = useState(false);

  const { data: allMembers } = qoreContext
    .view("allMembers")
    .useListRow({ limit: 100, order: "asc" }, { pollInterval: 500 });

  const deleteUser = qoreContext.view("allMembers").useDeleteRow();
  const updateUserStatus = qoreContext.view("allMembers").useUpdateRow();
  const { data: userDetails, status } = qoreContext
    .view("allMembers")
    .useGetRow(id);

  const detailViewHandler = () => {
    setDetailView(!detailView);
  };

  const getDetailsUser = (id: string) => {
    console.log(id);
    console.log(userDetails, status);
    setId(id);
    detailViewHandler();
    // router.push("/");
  };

  // Triggers fetch for new page
  // const handlePagination = (page) => {
  //   const path = router.pathname;
  //   const query = router.query;
  //   query.page = page.selected + 1;
  //   router.push({
  //     pathname: path,
  //     query: query,
  //   });
  // };

  return (
    <>
      <Head>
        <title>CMS Teskarir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full bg-blue-300 flex justify-between">
        <div className="w-1/4 bg-blue-600 min-h-screen min-w-max flex-col items-center justify-center px-15 py-20">
          <h1 className="text-xl font-bold cursor-pointer text-left bg-transparent w-9/12 h-max px-10 py-10  text-white">
            Admin
            <br />
            Dashboard
          </h1>
          <ul className="bg-transparent justify-center min-w-max min-w-max h-5/6 ">
            <li className="m-10 cursor-pointer text-white">Home</li>
            <li className="m-10 cursor-pointer text-white">Users Management</li>
            <li className="m-10 cursor-pointer text-white">Tes Kuis</li>
            <li className="m-10 cursor-pointer text-white">Tentang Karir</li>
            <li className="m-10 cursor-pointer text-white">Logout</li>
          </ul>
        </div>
        <div className="w-9/12 min-h-screen bg-gray-100 h-24 min-h-0 md:min-h-48 lg:w-full justify-around items-center">
          <div className="container md:container md:mx-auto  w-9/12 mt-24 justify-between flex flex-row items-center px-10">
            <h1 className="lg:text-xl sm:text-lg font-bold">
              Users Management
            </h1>

            <img
              src="http://teskarir.com/wp-content/uploads/2020/06/imageedit_17_9008611935-150x150.png"
              className="w-1/12"
            />
          </div>
          <div className="md:container md:mx-auto px-10 mt-20">
            {/* <ReactPaginate
              marginPagesDisplayed={1}
              pageRangeDisplayed={20}
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              onPageChange={handlePagination}
            /> */}

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
                          onChange={(e) =>
                            updateUserStatus.updateRow(user.id, {
                              role: {
                                id: user.role.id,
                                displayField: e.target,
                              },
                            })
                          }
                        >
                          <option selected value={user.role.displayField}>
                            {user.role.displayField}
                          </option>
                          <option value="admin">admin</option>
                          <option value="kontributor">kontributor</option>
                          <option value="peserta">peserta</option>
                        </select>
                        {/* {JSON.stringify(user.role)} */}
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
                          onClick={async () => {
                            await updateUserStatus.updateRow(user.id, {
                              status: !user.status,
                            });
                          }}
                          href="#"
                          className="text-blue-400 hover:text-blue-600 underline"
                        >
                          Change Status
                        </a>
                        <a
                          onClick={() => getDetailsUser(user.id)}
                          href="#"
                          className="text-blue-400 hover:text-blue-600 underline pl-6"
                        >
                          Lihat Detail
                        </a>
                        <a
                          onClick={async () => {
                            await deleteUser.deleteRow(user.id);
                          }}
                          href="#"
                          className="text-blue-400 hover:text-blue-600 underline pl-6"
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
            <div className="mt-10 ml-5">
              {detailView ? (
                <>
                  {userDetails ? (
                    <>
                      <h1 className="text-lg font-bold mb-3">Detail</h1>
                      <h2 className="text-md">USER ID : {userDetails.id}</h2>
                      <h3>Role : {userDetails.role.displayField}</h3>
                      <p>Username : {userDetails.username}</p>
                      <p>email : {userDetails.email}</p>
                      <p>Domisili : {userDetails.domicile}</p>
                      <p>Tanggal Lahir : {userDetails.birthDate}</p>
                      <p>
                        Status Akun :
                        {userDetails.status ? (
                          <span>Actived Account</span>
                        ) : (
                          <span>Suspend</span>
                        )}
                      </p>
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
