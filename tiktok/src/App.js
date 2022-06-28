import './App.css';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Content from './Content';
import { StoreContext, useStore } from './store';

const gifts = [
  "Car",
  "Motor",
  "Plane"
]

function App() {

  // [useState]: dung de set gia tri cho bien
  // const [state, setState] = useState(initState)
  let [counter, setCounter] = useState(1);

  let handleClick = () => {
    setCounter(counter + 1)
  }

  // VD: 2
  let [gift, setGift] = useState();

  const getGift = () => {
    let random = Math.floor(Math.random() * 3);
    setGift(gifts[random]);
  }

  // Two-way binding
  const [name, setName] = useState("");

  const handleGetName = () => {
    console.log("get name:", name);
  }

  // [useEffect]: useEffect(callback, [dependencies]->optionnal)
  // 1. callback luon dc goi khi component mounted (add vào)
  // Gọi callback mỗi khi render lai
  // Gọi callback sau khi add component vào DOM (gen HTML sau do call useEffect)
  // -> giong afterInitview cua angular
  // nhưng no sẽ họi liên tục mỗi khi re-render DOM
  useEffect(() => {
    // do anything
  })

  // 2. Đối số thứ 2 là 1 mãng rỗng
  // Chỉ gọi 1 lần khi component mounted
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(post => {
        console.log(post)
      })
  }, []) // -> bí quyết là ở đây, truyền mãng rỗng vào đối số thứ 2

  // 3. Đối số thứ 2 là mọt dependencies
  const dependencies = '';
  useEffect(() => {

  }, [dependencies]) // -> gọi lại hàm mỗi khi mà dependencies thay đổi
  // và so sánh bằng toán tử "===" (3 dấu bằng)

  // Listen DOM events
  //-> Khi add event vào DOM thì chỉ add 1 lần sau đó nó sẽ tự động callback
  // Nên nếu sử dụng useEffect chung ta sẽ xài cách thứ 2
  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up function
    // Được gọi trước khi component unmounted
    return () => {
      // Remove event listener ở đây để tránh leak memory
      // Vì khi component unmounted thì event listener vẫn còn
      window.removeEventListener("scroll", handleScroll);
    }
  }, []) // -> set rỗng để chạy đúng 1 lần
  // => nhớ clean up khi sử dụng setInterval, setTimeout

  // Lưu ý cho clean up trong useEffect:
  // Sẽ chạy trước lần re-render thứ 2 trở đi
  // Không chạy cho lần mounted component lần đầu

  // [useLayoutEffect]
  // khác với useEffect ở chổ là sẽ thực thi callback roi moi render UI
  // con useEffect render UI truoc roi moi thuc thi callback

  // [useRef]
  // Lưu giá trị qua một tham chiếu bên ngoài
  const [count, setCount] = useState(0);

  const interValId = useRef()

  const handleStartCount = () => {
    interValId.current = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000);
  }

  const handleStopCount = () => {
    clearInterval(interValId.current);
  }

  // [memo] <=> Higher Order Component (HOC)
  // để chống re-render lai component không cần thiết
  // check conponent con có thay đổi không, chỉ cần nhận ít nhất 1 props thay đổi thì mới render lai component
  // ví dụ: sử dụng <Content />

  // [useCallback] hook
  // tránh tạo ra những hàm mới không cần thiết
  // sử dụng cho cách truyền hàm vào component
  // => khi truyền callback vào component thì khi action thi component sẽ render lai, ne sử dụng useCallback de tránh render lại
  const handleIncrease = useCallback(() => {

  }, []) // -> rỗng sẽ render 1 lần, có thi sẽ check thay đổi để render -> giống useEffect
  // useCallback phải đi cùng với memo, vì nếu ko có memo thì component auto render lai khi props thay đổi
  // nên nếu ko có memo thì sử dụng useCallback vô nghĩa

  // [useMemo] -> nó là hook
  // [memo] -> tránh render lai compoent ko cần thiết
  // [usememo] -> tránh thực hiện lại 1 logic ko cần thiết
  // vì khi render lai component thì những hàm trong component se chạy lại
  const total = useMemo(() => {
    // tính toán o day
    // return value
  }, []) // -> check thay doi de call hàm tính toán, giống useEffect

  // [useReducer]
  // -> giống với [useState] nhưng useState dung de xử lý dữ liệu đơn giản
  // sử dụng khi hành động set state phức tạp

  // [useContext] <- quang trọng
  // -> communicate giữa các component
  // -> kiểu như share data trong service dùng chung bên Angular
  // global state

  // Advance
  // using global state
  const [globalState, dispatch] = useContext(StoreContext)

  // custome hook for combine context and provider
  const [state2, dispatch2] = useStore()

  // Bài 78 trên f8: xây dựng pattern cho global state
  // nhưng sử dụng cách này ko hay, vì no sẽ render lai toàn bộ ứng dụng

  // [useImperativehandle]
  // bài 79: ưng1 dụng de start, stop video

  // 84 css module
  // 86 xai clsx thư viện css

  // 89 router
  // https://reactrouter.com/

  //=> sử dụng redux de quan lý state

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={handleClick}>Click</button>
      <br />

      <h1>{gift || "Not found"}</h1>
      <button onClick={getGift}>Get gift</button>
      <br />

      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleGetName}>Get name</button>

      <div className='userRef'>
        <h1>useRef - {count}</h1>
        <button onClick={handleStartCount}>Start</button>
        <button onClick={handleStopCount}>Stop</button>
      </div>

      <div className='memo'>
        <h1>memo</h1>
        <Content />
      </div>

      <div className='useCallback'>

      </div>
    </div>
  );
}

export default App;
