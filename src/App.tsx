import React, { useState, useEffect, useCallback } from "react";
import TweetWrap from "./Components/TweetWrap";
import axios from "axios";
import { reset } from "./helpers";

function App() {
  const [data, setData]: Array<any> = useState([]);
  const [initialError, setInitialError]: any = useState(null);
  const [fetchError, setFetchError]: any = useState(null);

  const getNewestDataId = useCallback(() => {
    if (data[0]) {
      return data[0].id;
    }
  }, [data]);

  const getOldestDataId = () => {
    return data[data.length - 1].id;
  };

  useEffect(() => {
    axios
      .get(
        "https://magiclab-twitter-interview.herokuapp.com/kamil-albrycht/api"
      )
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        // Initial error happened repeat effect
        setInitialError(Date.now());
      });
  }, [initialError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(
          `https://magiclab-twitter-interview.herokuapp.com/kamil-albrycht/api?count=50&id=${getNewestDataId()}&direction=1`
        )
        .then(res => {
          // Dirty trick to stop when reach to the end
          if (res.data[0].id === 10001) {
            return;
          }
          setData([...res.data, ...data]);
        })
        .catch(err => {
          // Fetch error happened repeat effect
          setFetchError(Date.now());
        });
    }, 2000);
    return () => clearTimeout(timer);
  }, [data, fetchError, getNewestDataId]);

  const loadMore = () => {
    axios
      .get(
        `https://magiclab-twitter-interview.herokuapp.com/kamil-albrycht/api?count=50&id=${getOldestDataId()}&direction=-1`
      )
      .then(res => {
        setData([...data, ...res.data]);
      })
      .catch(err => {
        // loadMore PROBLEM
      });
  };

  if (data.length === 0) {
    return <div>Loading</div>;
  }

  // EDGE CASES: tweets are just pushed to array but when
  // first request will be slower than second one order
  // will be wrong, can be fixed by implementing function
  // that will push elements exactly before specific ID

  return (
    <div>
      <button
        onClick={() => {
          reset();
        }}
      >
        RESET
      </button>
      <TweetWrap loadMore={loadMore} tweets={data} />
    </div>
  );
}
export default App;
