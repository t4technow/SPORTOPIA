import React, { useEffect, useState } from "react";
import Useraxios from "../../../Axios/userAxios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function JoinedTournaments() {
  const userAxios = Useraxios();
  const navigate = useNavigate();
  const[tournamentData,setTournamentData]=useState('')
  const clubId = useSelector((state) => state.Club.clubId);

  useEffect(() => {
    const getData = async (req, res) => {
      try {
        const res = await userAxios.get(`/getJoinedTournaments?id=${clubId}`);
        if (res) {
          console.log(res.data.result);
          setTournamentData(res.data.result);
        }
      } catch (error) {
        console.log(error)
      }
    };

    getData();
  }, []);
  
  function convertISODateToReadable(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  }

  const viewTournament=(id)=>{
    navigate(`/viewTournament/${id}`)
  }

  return (
    <>
      <div className="flex justify-center md:justify-between  ">
        <div className="mt-8 mx-11 hidden md:block  md:text-xl text-white font-bold tracking-wide">
          JOINED TOURNAMENTS
        </div>
      </div>
      {tournamentData.length!=0?tournamentData.map((result) => {
          return (
            <div className="container flex flex-col items-center md:flex-row md:justify-around  bg-gray-900 bg-opacity-60 mt-7 ml-auto mr-auto rounded-md mb-7 border border-black">
              <div className="mb-auto mt-auto flex">
                <div className="bg-gradient-to-r from-gray-800 to-gray-400  w-[10rem] h-[10rem] mt-3 md:m-2 flex justify-center">
                  <img
                    className="w-[6rem] h-[6rem] mb-auto mt-auto"
                    src={result.clubId.logo}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <ul className="mt-4 mb-4 ">
                  <h2 className="font-bold mt-4 text-lg text-white trackinge-wide">
                    {result.tournamentName}
                  </h2>
                  <li className="font-semibold mt-3  text-gray-400">
                  Sports type:{result.sportsType}
                  </li>
                  <li className="font-semibold mt-3  text-gray-400">
                    Starting Date:{convertISODateToReadable(result.startingDate)}
                  </li>
                  <li className="font-semibold mt-3  text-gray-400">
                    Ending Date:{convertISODateToReadable(result.endingDate)}
                  </li>
                </ul>
              </div>
              <div className="my-auto">
               <button
                  onClick={() => {
                    viewTournament(result._id);
                  }}
                  className="bg-black w-[7rem] mb-3 h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold "
                >
                  VIEW
                </button>
                
              </div>
            </div>
          );
        }):
        (
            <div className="flex justify-center mt-36 h-screen">
              <div className="mt-8 mx-11 hidden md:block text-white md:text-xl font-bold tracking-wide">
                NO TOURNAMENT AVAILABLE
              </div>
            </div>
          )}
    </>
  );
}

export default JoinedTournaments;
