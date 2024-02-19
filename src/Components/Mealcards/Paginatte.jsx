import { useState } from "react";

function Paginatte({ postperpage, totalposts, Paginate }) {
  const [activepage, setActivepage] = useState(1);

  const pagenumbers = [];

  for (let i = 1; i < Math.ceil(totalposts / postperpage); i++) {
    pagenumbers.push(i);
  }



  const handlepageclick = (number)=>{
    setActivepage(number)
    Paginate(number)
  }
  return (
    <>
      <nav>
        <ul className="previews">
          {pagenumbers.map((number) => (
            <li key={number}>
              <a
                href="!#"
                onClick={() => {
                  handlepageclick(number);
                  Paginate(number);
                }}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Paginatte;
