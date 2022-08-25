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
      const filteredData = await data.recipes.filter((item) => {
        if (
          item.analyzedInstructions &&
          item.extendedIngredients &&
          item.image
        ) {
          if (item.analyzedInstructions[0]) {
            if (item.analyzedInstructions[0].steps) {
              return true;
            }
          }
        }
        return false;
      });
      console.log(filteredData);
      setRecipe(await filteredData);
      let index = Math.floor(Math.random() * (await filteredData.length));
      console.log([filteredData[index]]);
      setPreviousIndex([previousIndex[1], index]);
      setRandomRecipe(await filteredData[index]);
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
                      {randomRecipe.title}
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
              <div>
                <div className="d-grid gap-2 ">
                  <button
                    class="btn btn-success p-2  "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#ingredients"
                    aria-expanded="false"
                    aria-controls="ingredients"
                  >
                    <span>
                      <h4>Ingredients</h4>{" "}
                    </span>
                    <i className="fa-solid fa-2x fa-arrow-down "></i>
                  </button>
                </div>
                <div class="collapse" id="ingredients">
                  <div class="card card-body ">
                    <ul>
                      {randomRecipe.extendedIngredients
                        ? randomRecipe.extendedIngredients.map((item) => {
                            return <li>{item.original}</li>;
                          })
                        : "ok"}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-grid gap-2 ">
                  <button
                    class="btn btn-danger p-2  mt-1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#steps"
                    aria-expanded="false"
                    aria-controls="steps"
                  >
                    <span>
                      <h4>Recipe</h4>{" "}
                    </span>
                    <i className="fa-solid fa-2x fa-arrow-down "></i>
                  </button>
                </div>
                <div class="collapse" id="steps">
                  <div class="card card-body ">
                    <ol>
                      {randomRecipe.analyzedInstructions
                        ? randomRecipe.analyzedInstructions[0].steps
                          ? randomRecipe.analyzedInstructions[0].steps.map(
                              (item) => {
                                return <li>{item.step}</li>;
                              }
                            )
                          : "ok"
                        : "ok"}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const w = { maxWidth: 700 };

ReactDOM.render(<APP />, document.getElementById("app"));
