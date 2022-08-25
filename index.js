function APP() {
  const [recipe, setRecipe] = React.useState([]);
  const [randomRecipe, setRandomRecipe] = React.useState([]);
  /* const [color, setColor] = React.useState("#5B5EA6");*/

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("/recipeData.json");
      const data = await response.json();
      setRecipe(await data.recipes);
      let index = Math.floor(Math.random() * (await data.recipes.length));
      console.log([data.recipes[index]]);
      setRandomRecipe(data.recipes[index]);
    }
    fetchData();
  }, []);
  function changeRecipe() {
    /*const colors = [
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

    let cIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[cIndex]);*/
    let index = Math.floor(Math.random() * recipe.length);
    setRandomRecipe(recipe[index]);
  }

  return (
    <div style={{ minHeight: "100vh" }} id="back">
      <div className="container pt-5 ">
        <div className="p-5 mb-4 rounded-3 " id="bord">
          <div className="card">
            <div className="card-header">
              <h6 className="text-center">Random Recipe Generator</h6>
            </div>
            <div className="card-body ">
              <div className="text-center">
                {randomRecipe ? (
                  <>
                    <h5 className="card-title text-center">
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
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span>
                      <h4>Ingredients</h4>{" "}
                    </span>
                    <i className="fa-solid fa-2x fa-arrow-down "></i>
                  </button>
                </div>
                <div class="collapse" id="collapseExample">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const w = { maxWidth: 700 };

ReactDOM.render(<APP />, document.getElementById("app"));
