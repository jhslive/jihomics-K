import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import tanguPic from "./tangu.png";
import html2canvas from "html2canvas";



function App() {
  const [coin, setCoin] = useState("BTCUSDT");
  const [entryPrice, setEntryPrice] = useState("16700");
  const [closingPrice, setClosingPrice] = useState("16750");
  const [isLong, setIsLong] = useState(true);
  const [numsLoc, setNumsLoc] = useState([227, 570, 570]);
  const [numLocLR, setNumLocLR] = useState(1000);
  const [leverage, setLeverage] = useState(30);
  const [date, setdate] = useState(new Date().toLocaleString('en-US', { hour12: false,}));
  const [result, setResult] = useState(
    ((closingPrice / entryPrice - 1) * 75 * 100).toFixed(2)
  );
  const [tangu, setTangu] = useState(false);

  var downloadCount = 0;
    

  useEffect(() => {

    const calculated = (
      (closingPrice / entryPrice - 1) *
      leverage *
      100
    ).toFixed(2);
    if (!isLong && calculated < 0) {
      setResult(-calculated);
    } else {
      setResult(calculated);
    }

  }, [entryPrice, closingPrice, coin, isLong, leverage]);

  function imageDownload(name)
  {
    const image = document.getElementById("image");
    html2canvas(image).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), name + ".png");
    });
  }

  function downLoadEntryPrice() {
    downloadCount = 7;
    const interval = setInterval(() => {
      downloadCount--;
      
      var entryPriceCount = (Number(entryPrice)+(downloadCount*0.2)).toFixed(1);
      var entryPriceFilename ;
      if(downloadCount===6)
      {
        entryPriceFilename = entryPrice       
      }
      else
      {
        entryPriceFilename = (Number(entryPrice)+((downloadCount+1)*0.2)).toFixed(1);
      }
      
      var name = "";
         switch(downloadCount)
        {
           case 0: name = "정지호-돌K"; break;
           case 1: name = "최성준-돌K"; break;
           case 2: name = "최태원-돌K"; break;
           case 3: name = "김동욱-돌K"; break;
           case 4: name = "강준식-돌K"; break;           
           case 5: name = "정한솔-돌K"; break;
           case 6: name = "강문식-돌K"; break;
        }
      
      console.log("downloadCount = " + downloadCount);
      imageDownload(name);
      setEntryPrice(entryPriceCount);

      if(downloadCount===0)      
      {
        clearInterval(interval);    
        setEntryPrice(entryPrice);
      }
    }, 1000);    
  }

  function downLoadClosingPrice() {
    downloadCount = 7;
    const interval = setInterval(() => {
      downloadCount--;
      
      var closingPriceCount = (Number(closingPrice)+(downloadCount*0.2)).toFixed(1);
      var closingPriceFilename ;
      if(downloadCount===6)
      {
        closingPriceFilename = closingPrice       
      }
      else
      {
        closingPriceFilename = (Number(closingPrice)+((downloadCount+1)*0.2)).toFixed(1);
      }

      var name = "";
         switch(downloadCount)
        {
           case 0: name = "정지호-돌K"; break;
           case 1: name = "최성준-돌K"; break;
           case 2: name = "최태원-돌K"; break;
           case 3: name = "김동욱-돌K"; break;
           case 4: name = "강준식-돌K"; break;
           case 5: name = "정한솔-돌K"; break;
           case 6: name = "강문식-돌K"; break;
        }
      
      console.log("downloadCount = " + downloadCount);
      imageDownload(name);
      setClosingPrice(closingPriceCount);

      if(downloadCount===0)      
      {
        clearInterval(interval);    
        setClosingPrice(closingPrice);
      }
    }, 1000);    
  }


  function down() {
    const one = numsLoc[0] + 1;
    const two = numsLoc[1] + 1;
    const three = numsLoc[2] + 1;
    setNumsLoc([one, two, three]);
  }
  function up() {
    const one = numsLoc[0] - 1;
    const two = numsLoc[1] - 1;
    const three = numsLoc[2] - 1;
    setNumsLoc([one, two, three]);
  }
  function left() {
    setNumLocLR(numLocLR - 1);
  }
  function right() {
    setNumLocLR(numLocLR + 1);
  }
  
  function leverageup() {
    setLeverage(leverage + 20.00);
  }
    function leveragedown() {
    setLeverage(leverage - 20.00);
  }

  const onSaveAs = (uri, filename) => {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <span>
        롱(체크)/숏(미체크) &nbsp;
        <input
          type="checkbox"
          checked={isLong}
          onChange={(e) => setIsLong(!isLong)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        코인종류 &nbsp;
        <input value={coin} onChange={(e) => setCoin(e.target.value)} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        Leverage &nbsp;
        <input value={leverage} onChange={(e) => setLeverage(e.target.value)} />
      </span>
      <br />
      <br />
      <span>
        매수금액 &nbsp;
        <input
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        매도금액 &nbsp;
        <input
          value={closingPrice}
          onChange={(e) => setClosingPrice(e.target.value)}
        />
      </span>
      <br />
      <br />
      <span>
        날짜시간 &nbsp;
        <input
         value={date}
         onChange={(e) => setdate(e.target.value)}
         />
      </span>  
      <br />
      <br />      
      <button onClick={leverageup}>레버리지 업</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <button onClick={leveragedown}>레버리지 다운</button>
      <br />
      <br />
      <button onClick={up}>숫자 위로</button>    
      <br />
      <br />
      <button onClick={left}>숫자 좌로</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={right}>숫자 우로</button>
      <br />
      <br />
      <button onClick={down}>숫자 아래로</button>
      <br />
      <br />
      <button onClick={downLoadEntryPrice}>다운로드(매수)</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={downLoadClosingPrice}>다운로드(매도)</button>
      <br />
      <br />
      <div
        id="image"
        style={{
          backgroundImage: `url(${tangu ? tanguPic : (isLong ? bgLong : bgShort)})`,
          backgroundSize: "cover",
          height: "840px",
          width: "1346px",
          margin: "0 auto",
          position: "relative",
        }}
      >

          <div
            style={{
              position: "absolute",
              left: "85px",
              top: "160px",
              fontSize:"42px",
              color: "rgb(254,254,254)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {coin}
          </div>
         
          <div
            style={{
              position: "absolute",
              left: numLocLR - 810 + "px",
              top: numsLoc[0] + "px",
              fontSize: "28px",
              color: "RGB(126,126,126)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {leverage.toFixed(2)}X
          </div>
          <div
            style={{
              position: "absolute",
              left: numLocLR - 915 + "px",
              top: numsLoc[1] + "px",
              fontSize: "30px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            ₮ {(Number(entryPrice)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              left: numLocLR - 730 + "px",
              top: numsLoc[2] + "px",
              fontSize: "30px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            ₮ {(Number(closingPrice)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              left: "235px",
              top: "730px",
              fontSize: "28px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {date}
          </div>
           <div
            style={{
              position: "relative",
            }}
          >
                <div
              style={{
                position: "absolute",
                left: "80px",
                top: "345px",
                fontSize: "125px",
                color: "rgb(4, 191, 136)",
                fontFamily: "HarmonyOS Sans",
                fontWeight: "700",

              }}
            >
              {result > 0 ? (
                <span
                  style={{
                    fontSize: "125px",
                    fontWeight: "700",
                  }}
                >
                  +
                </span>
              ) : (
              ""
              )}
              {result}
              <span
                style={{
                    fontSize: "125px",
                    fontWeight: "700",
                }}
              >
                %
              </span>
            </div>
          </div> 
      </div>
      <br />
      <br />
      <div>
        <i>Made By</i> <b>Jung Ji </b><span onClick={() => setTangu(!tangu)}><b>Ho</b></span>
      </div>
    </div>
  );
}

export default App;
