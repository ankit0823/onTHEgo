import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchBar =({
    suggestions, setTrip, setRideOption, setPickup, setDestination, activeField
}) =>{
    const handleSuggestionClick =(suggestion) =>{
        if(activeField === 'pickup'){
            setPickup(suggestion)
        }
        else if(activeField === 'destination'){
            setDestination(suggestion)
        }
        // setRideOption(true)
        // setTrip(false)
    }

    return (
        <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className=' flex gap-4 bg-[#e7e1dc] border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchBar
// // const LocationSearchBar = (props) => {

// //     const location = [
// //         "d/30b Zone-8, bisanagar jamshedpur, JHARKAHND",
// //         "d/30b Zone-2, bisanagar jamshedpur, JHARKAHND",
// //         "d/30b Zone-3, bisanagar jamshedpur, JHARKAHND",
// //         "d/30b Zone-5, bisanagar jamshedpur, JHARKAHND",
// //     ]
// //   return (
// //     <div>

// //         {
// //             location.map(function(elem, idx){
// //                 return <div key={idx} onClick={()=>{
// //                     props.setRideOption(true)
// //                     props.setTrip(false)
// //                 }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
// //                 <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'><i className="p-2 ri-map-pin-fill"></i></h2>
// //                 <h4 className='font-medium'> {elem} </h4>
// //             </div>
// //             })
// //         }

// //         {/* <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
// //             <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'><i className="p-2 ri-map-pin-fill"></i></h2>
// //             <h4 className='font-medium'> d/30b Zone-8, bisanagar jamshedpur, JHARKAHND </h4>
// //         </div>

// //         <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
// //             <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'><i className="p-2 ri-map-pin-fill"></i></h2>
// //             <h4 className='font-medium'> d/30b Zone-8, bisanagar jamshedpur, JHARKAHND </h4>
// //         </div>

// //         <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
// //             <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'><i className="p-2 ri-map-pin-fill"></i></h2>
// //             <h4 className='font-medium'> d/30b Zone-8, bisanagar jamshedpur, JHARKAHND </h4>
// //         </div>

// //         <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
// //             <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'><i className="p-2 ri-map-pin-fill"></i></h2>
// //             <h4 className='font-medium'> d/30b Zone-8, bisanagar jamshedpur, JHARKAHND </h4>
// //         </div>

// //         <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
// //             <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'><i className="p-2 ri-map-pin-fill"></i></h2>
// //             <h4 className='font-medium'> d/30b Zone-8, bisanagar jamshedpur, JHARKAHND </h4>
// //         </div> */}

// //     </div>
// //   )
// // }

// // export default LocationSearchBar

// // // import React from 'react';

// // // const LocationSearchBar = ({ setTrip, setRideOption, suggestions, handleSuggestionClick }) => {
// // //   return (
// // //     <div>
// // //       {suggestions.length > 0 && (
// // //         <ul className='suggestion-list'>
// // //           {suggestions.map((suggestion, index) => (
// // //             <li
// // //               key={index}
// // //               onClick={() => handleSuggestionClick(suggestion, 'pickup' /* or 'destination' based on input field */)}
// // //               className='suggestion-item'>
// // //               {suggestion}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default LocationSearchBar;


// import React from 'react';
// import 'remixicon/fonts/remixicon.css';

// const LocationSearchBar = ({
//   suggestion,
//   setTrip,
//   setRideOption,
//   setPikup,
//   setDestination,
//   activeField,
// }) => {
//   return (
//     <div>
//       {suggestion.length > 0 && (
//         <ul className='suggestion-list'>
//           {suggestion.map((elem, idx) => (
//             <li
//               key={idx}
//               onClick={() => {
//                 if (activeField === 'pickup') {
//                   setPikup(elem);
//                 } else if (activeField === 'destination') {
//                   setDestination(elem);
//                 }
//                 setRideOption(true);
//                 setTrip(false);
//               }}
//               className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
//             >
//               <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'>
//                 <i className='p-2 ri-map-pin-fill'></i>
//               </h2>
//               <h4 className='font-medium'>{elem}</h4>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LocationSearchBar;

