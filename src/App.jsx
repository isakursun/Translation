import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useEffect, useMemo, useState } from "react";
import { getLanguages, translateText } from "./redux/actions/translateAction";
import Select from "react-select";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState({
    value: 'tr',
    label: 'Turkish',
  });
  const [targetLang, setTargetLang] = useState({
    value: 'en',
    label: 'English'
  });

  //? dizideki code ve name keylerine sahip verilerin
  //? keylerini value ve label a çevirdik ve select in
  //? options una verdik.
  const refinedData = useMemo(() => {
    return state.languages.map((i) => ({
      value: i.code,
      label: i.name,
    }));
  }, [state.languages]);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleSwap = () => {
    setTargetLang(sourceLang)
    setSourceLang(targetLang)
    setText('')
    dispatch(clearAnswer())
  }

  return (
    <div id="main-page">
      <div className="container">
        <h1>Translation +</h1>
        {/* üst kisim */}
        <div className="upper">
          <Select
            onChange={setSourceLang}
            value={sourceLang}
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={refinedData}
          />
          <button onClick={handleSwap}>Change</button>
          <Select
            onChange={setTargetLang}
            value={targetLang}
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={refinedData}
          />
        </div>
        {/* orta kisim */}
        <div className="center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something to translate."
          ></textarea>
          <textarea className={state.isTextLoading ? 'loading' : ''} value={state.answer} disabled></textarea>
        </div>
        {/* alt kisim */}
        <button onClick={() => {dispatch(translateText({sourceLang,targetLang,text}))}} id="translate-btn">Translate</button>
      </div>
    </div>
  );
}

export default App;
