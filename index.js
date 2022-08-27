function APP() {
  const [recipe, setRecipe] = React.useState([]);
  const [randomRecipe, setRandomRecipe] = React.useState([]);
  const [color, setColor] = React.useState("#5B5EA6");
  const [previousIndex, setPreviousIndex] = React.useState([0, 1]);
  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://julian-deca.github.io/randomRecipePage/recipeData.json"
      );
      const data = await response.json();
      setRecipe(await data);
      let index = Math.floor(Math.random() * (await data.length));
      setPreviousIndex([previousIndex[1], index]);
      setRandomRecipe(await data[index]);
    }
    fetchData();
  }, []);
  function changeRecipe() {
    const colors = [
      "#34568B",
      "#FF6F61",
      "#6B5B95",
      "#88B04B",
      "#F7CAC9",
      "#92A8D1",
      "#955251",
      "#009B77",
      "#5B5EA6",
      "#D65076",
      "#98B4D4",
    ];
    let index = Math.floor(Math.random() * recipe.length);
    if (index == previousIndex[0] || index == previousIndex[1]) {
      changeRecipe();
      return;
    }
    setPreviousIndex([previousIndex[1], index]);
    setRandomRecipe(recipe[index]);
    let cIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[cIndex]);
  }

  return (
    <div
      style={{ backgroundColor: color, minHeight: "100vh", width: "100%" }}
      id="back"
    >
      <div className="container pt-5 ">
        <div className="p-4 mb-4 rounded-3 " id="board">
          <div className="card">
            <div className="card-header">
              <h6 className="text-center fw-bold">Random Recipe Generator</h6>
            </div>
            <div className="card-body ">
              <div className="text-center">
                {randomRecipe ? (
                  <>
                    <h5 className="card-title text-center fw-bold">
                      {randomRecipe.name}
                    </h5>
                    <img
                      className="img-fluid img-thumbnail "
                      src={randomRecipe.image}
                    />
                  </>
                ) : (
                  <h2>loading...</h2>
                )}
              </div>
              <div className=" d-grid gap-2">
                <button
                  className="btn btn-primary mt-2 mb-1"
                  onClick={changeRecipe}
                >
                  <h4>next recipe</h4>
                  <i className="fa-solid fa-2x fa-arrow-right "></i>
                </button>
              </div>
              <Dropdown
                prop="ingredients"
                color="success"
                maping="original"
                order={false}
                title="Ingredients"
                randomRecipe={randomRecipe}
              />
              <Dropdown
                prop="steps"
                color="danger"
                maping="step"
                order={true}
                title="Recipe"
                randomRecipe={randomRecipe}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Dropdown(props) {
  const [arrowIcon, setArrowIcon] = React.useState(
    "fa-solid fa-2x fa-arrow-down "
  );

  const changeArrow = async () => {
    setArrowIcon((prev) => {
      return prev == "fas fa-2x fa-arrow-up "
        ? "fa-solid fa-2x fa-arrow-down "
        : "fas fa-2x fa-arrow-up ";
    });
  };
  return (
    <div>
      <div className="d-grid gap-2 ">
        <button
          class={"btn btn-" + props.color + " p-2  mt-1"}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + props.prop}
          aria-expanded="false"
          aria-controls={props.prop}
          onClick={() => {
            changeArrow();
          }}
        >
          <span>
            <h4>{props.title}</h4>{" "}
          </span>
          <i className={arrowIcon}></i>
        </button>
      </div>
      <div class="collapse" id={props.prop}>
        <div class="card card-body ">
          {props.order ? (
            <ol>
              {" "}
              {props.randomRecipe[props.prop]
                ? props.randomRecipe[props.prop].map((item) => {
                    return <li>{item}</li>;
                  })
                : "loading..."}
            </ol>
          ) : (
            <ul>
              {" "}
              {props.randomRecipe[props.prop]
                ? props.randomRecipe[props.prop].map((item) => {
                    return <li>{item}</li>;
                  })
                : "loading..."}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const w = { maxWidth: 700 };

ReactDOM.render(<APP />, document.getElementById("app"));
