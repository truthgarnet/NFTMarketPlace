import Image from 'next/image'
import Map from './images/map.jpg'

export default function WorldMap() {

   return (

      <div className='grid grid-cols-3 grid-flow-col'>
         <div className='col-span-2'>
            <Image
               src={Map}
               alt="Picture of the author"
               width={1500}
               height={2000}
            />
         </div>
         <h1>a</h1>

      </div>
   );
}

