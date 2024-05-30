import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [clicked, setClicked] = useState(false);
  const [anwser, setAnswer] = useState({
    chipher: {
      answer: "CAN WE HUG AFTER CLASS?",
      answerd: false,
      clicked: false,
      input: "",
    },
    reaction: {
      answer: "my honest reaction",
      answerd: false,
      clicked: false,
      input: "",
    },
    tiktok: {
      answer: [
        "https://www.tiktok.com/@prasun_03/video/7293443550384065800",
        "https://www.tiktok.com/@prasun_03/video/7293443550384065800/",
        "https://vt.tiktok.com/ZSY6a6K8n/",
        "https://vt.tiktok.com/ZSY6a6K8n",
      ],
      answerd: false,
      clicked: false,
      input: "",
    },
    timer: {
      time: 1800000,
      passedTime: 0,
      clicked: false,
      answerd: false,
    },
    IQ: {
      answer: "144",
      answerd: false,
      clicked: false,
      input: "",
    },
  });
  const [timer, setTimer] = useState(1800000);
  const [show, setShow] = useState(false);
  const intervalRef = useRef(null); // useRef to store the interval ID

  const onResultShow = (from, array) => {
    if (array) {
      let correct = anwser.tiktok.answer.includes(anwser.tiktok.input);
      return setAnswer((prev) => {
        return {
          ...prev,
          tiktok: {
            ...prev.tiktok,
            answerd: correct,
            clicked: true,
          },
        };
      });
    }
    setAnswer((prev) => {
      return {
        ...prev,
        [from]: {
          ...prev[from],
          clicked: true,
          answerd: prev[from].answer === prev[from].input ? true : false,
        },
      };
    });
  };

  const onTyping = (from, input) => {
    setAnswer((prev) => {
      return {
        ...prev,
        [from]: {
          ...prev[from],
          input,
        },
      };
    });
  };
  const formatTime = (time) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return padTime(minutes) + ":" + padTime(seconds);
  };

  const padTime = (time) => {
    return time.toString().padStart(2, "0");
  };
  const seeResult = () => {
    let leastCount = 0;
    for (let key in anwser) {
      if (anwser[key].answerd) {
        leastCount++;
      }
    }
    if (leastCount === 4) {
      setShow(true);
    } else {
      alert("Nope. Solve Those All.");
    }
  };
  const startTimer = () => {
    let velocity = 0;
    if (intervalRef.current) return; // If interval already exists, do nothing
    console.log("the duck");
    intervalRef.current = setInterval(() => {
      console.log("the timer: ", velocity);
      if (velocity === 1800) {
        setAnswer((prev) => {
          return {
            ...prev,
            timer: {
              ...prev.timer,
              answerd: true,
            },
          };
        });
        seeResult();
        clearInterval(intervalRef.current);
      }
      setTimer((prevTimer) => prevTimer - 1000);
      velocity++;
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onTimerClick = () => {
    if (!clicked) {
      setClicked(true);
      startTimer();
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else if (clicked) {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopTimer(); // Clean up interval on component unmount
    };
  }, [clicked]);

  useEffect(() => {
    if (timer <= 0) {
      stopTimer();
      setClicked(false);
    }
  }, [timer]);

  return (
    <div style={styles.container}>
      {!show ? (
        <>
          <h1 style={styles.header}>
            Hey, I found this special picture after 91 hours of searching. I
            want you to see it because it's truly priceless and precious. I
            dedicated a lot of effort to finding it, so I hope you're willing to
            put in some effort too. I have a few challenges for you to tackle,
            and if you succeed, you'll get to see this beautiful image. Trust
            me, it’s worth it—this picture holds something truly amazing. GOOD
            LUCK.
          </h1>
          <h3 style={styles.subHeader}>Question 1 (easy one)</h3>
          <p>Find the name of this meme:</p>
          <video
            src="./reaction.mp4"
            controls
            loop
            style={styles.video}
          ></video>
          <hr />
          <label htmlFor="reaction">Enter here: </label>
          <input
            type="text"
            placeholder="meme name..."
            style={styles.input}
            value={anwser.reaction.input}
            onChange={(event) => onTyping("reaction", event.target.value)}
          />
          <button onClick={() => onResultShow("reaction")}>See result</button>
          {anwser.reaction.clicked ? (
            <p>{anwser.reaction.answerd ? "✅Correct" : "❌Wrong"}</p>
          ) : null}
          <hr />
          <h3 style={styles.subHeader}>Question 2 (Hard one) CIA level</h3>
          <p>
            Paste the video url of where this video uploaded (e.g., Facebook,
            TikTok, YouTube, etc.) where this video was uploaded by analyzing
            the screenshot provided.
          </p>
          <img src="./worker.png" alt="" style={styles.image} />
          <button
            onClick={() => {
              window.open("./worker.png");
            }}
            style={styles.button}
          >
            Open Image in new tab.
          </button>
          <hr />
          <label htmlFor="reaction">Enter URL here: </label>
          <input
            type="text"
            placeholder="https://something...."
            style={styles.input}
            value={anwser.tiktok.input}
            onChange={(event) => onTyping("tiktok", event.target.value)}
          />
          <button onClick={() => onResultShow("tiktok", true)}>
            See result
          </button>
          {anwser.tiktok.clicked ? (
            <p>{anwser.tiktok.answerd ? "✅Correct" : "❌Wrong"}</p>
          ) : null}
          <hr />
          <h3 style={styles.subHeader}>Question 3 (Easy one)</h3>
          <p>
            CIPHER TEXT: PBQ JX YJF JPJMZ JYPPR. CODE: Z B C D L M A G K F E H N
            O P Q R S T U V W X I J Y <br />
            Now, what is the decrypted code of: PBQ JX YJF JPJMZ JYPPR? Is it in
            English?
          </p>
          <label htmlFor="reaction">Enter DECRYPTED WORDS: </label>
          <input
            type="text"
            placeholder="SOME SOME SOME THING...."
            style={styles.input}
            value={anwser.chipher.input}
            onChange={(event) => onTyping("chipher", event.target.value)}
          />
          <button onClick={() => onResultShow("chipher")}>See result</button>
          {anwser.chipher.clicked ? (
            <p>{anwser.chipher.answerd ? "✅Correct" : "❌Wrong"}</p>
          ) : null}
          <hr />
          <h3 style={styles.subHeader}>
            Question 4 (Universal Impossible one)
          </h3>
          <p>What's my secret password?</p>
          <label htmlFor="reaction">My secret code: </label>
          <input
            type="text"
            placeholder="...."
            style={styles.input}
            value={anwser.IQ.input}
            onChange={(event) => onTyping("IQ", event.target.value)}
          />
          <button onClick={() => onResultShow("IQ")}>See result</button>
          {anwser.IQ.clicked ? (
            <p>{anwser.IQ.answerd ? "✅Correct" : "❌Wrong"}</p>
          ) : null}
          <hr />
          <h3 style={styles.subHeader}>Okay, the last one (IRRITATING ONE)</h3>
          <p>
            Rule: After clicking the start timer, you need to wait until the
            timer ends. If you close the tab or minimize it, it won't work. You
            completely need to wait for 30 minutes straight, or you can leave
            here.
          </p>
          <button onClick={onTimerClick} style={styles.button}>
            Start the timer
          </button>
          {clicked ? (
            <p>
              Cool, minimize your browser and open it again to start the timer:
              ---- {formatTime(timer)}
            </p>
          ) : null}
        </>
      ) : (
        <>
          <img
            src="https://i.imgur.com/CrRwETF.jpg"
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
            alt="Responsive"
          />
          <hr />
          Here's the image, enjoy. <br />
          Scroll down to see one more magic.&#x2193;
          <p style={{ marginTop: "40rem" }}>
            See this:{" "}
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              Hey Click me
            </a>
          </p>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    lineHeight: "1.6",
    margin: "20px",
  },
  header: {
    color: "#2c3e50",
    textAlign: "center",
  },
  subHeader: {
    color: "#16a085",
    marginTop: "20px",
  },
  video: {
    display: "block",
    margin: "20px auto",
    maxWidth: "100%",
  },
  image: {
    display: "block",
    margin: "20px auto",
    maxWidth: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
