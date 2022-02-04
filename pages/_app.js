import '../styles/globals.css'
import Link from 'next/link'
import Image from "next/image";

function MyApp({ Component, pageProps }) {
  return (
    <div id='wrapper'>
      <nav className="border-b p-6 font-mono text-3xl" id='nav'>
        <div className='flex mt-4'>
          <Link href='/'>
            <a className='mr-8 ml-8 text-blue-50'>포켓티</a>
          </Link>
          <Link href='/create-item'>
            <a className='mr-6 text-black-500'>만들기</a>
          </Link>
          <Link href='/my-assets'>
            <a className='mr-6 text-black-500'>마이페이지</a>
          </Link>
          <Link href='/creator-dashboard'>
            <a className='mr-6 text-black-500'>대쉬보드</a>
          </Link>
          <Link href='/help'>
            <a className='mr-6 text-black-500'>도움</a>
          </Link>
          <Link href='/log-out'>
            <a className='mr-6 text-black-500'>로그아웃</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />

      <footer id='footer'>
        <p>회사 포켓메모리</p>
        <p>서울특별시 영등포구 문래동3가 82-12 자율빌딩 5층, 6층</p>
        <p>대표 조용석 | 사업자등록번호 107-88-22036</p>
        <p>© 2021 Pocket Memory Co.,Ltd. All Rights Reserved.</p>
      </footer>
    </div>

  );
}

export default MyApp
