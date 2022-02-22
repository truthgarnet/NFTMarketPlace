import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        //Polygon Network
        /*
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x89", // 137
            chainName: "Matic(Polygon) Mainnet",
            nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com"],
            blockExplorerUrls: ["https://www.polygonscan.com/"],
          }]
        });
        */

        //예외 처리해주기
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x13881", // 80001
            chainName: "Matic(Polygon) Testnet",
            nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
            blockExplorerUrls: ["https://mumbai-explorer.matic.today/"],
          }]
        });
      } catch (error) {
        return{
          error: 'An unexpected error occurs',
          message: 'Please check if Network is added to your metamask',
          
        };
      }
    }
  };

  
  return (
    <div id='wrapper'>
      <nav className="border-b p-6 font-mono text-3xl" id='nav'>
        <div className='flex mt-4'>

          <h3 className='absolute left-0 top-0 h-16 pl-6 pt-7'>포켓티</h3>

          <div className='absolute top-0 right-0 h-16 pr-6 pt-7 '>
            <button /*</div>onClick={langauge}*/ className='pr-5'>언어</button>
            <button onClick={connectWallet}>로그인</button>
          </div>
        </div>
      </nav>
      <div className='border-b' id="nav2">
        <Link href='/'>
          <a className='ml-6 mr-6 text-black-500'>홈</a>
        </Link>
        <Link href='/create-item'>
          <a className='mr-6 text-black-500'>만들기</a>
        </Link>
        <Link href='/world-map'>
          <a className='mr-6 text-black-500'>월드 맵</a>
        </Link>
        <Link href='/my-assets'>
          <a className='mr-6 text-black-500'>마이페이지</a>
        </Link>
      </div>

      <Component {...pageProps} />

      <footer className='bg-black'>
        <div className='text-white'>
          <p>회사 포켓메모리</p>
          <p>서울특별시 영등포구 문래동3가 82-12 자율빌딩 5층, 6층</p>
          <p>대표 조용석 | 사업자등록번호 107-88-22036</p>
          <p>© 2021 Pocket Memory Co.,Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </div>

  );
}

export default MyApp
