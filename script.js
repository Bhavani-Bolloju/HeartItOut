"use strict";

const select_query = document.querySelector(".query");

const accordion_container = document.querySelector(".accordion-container");

const template = function ({ type, name, summary, link }) {
  const html = `<div class="col text-center">
        <h5 class="card-title mb-3">${type}</h5>
            <div class="card">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      ${name}
                    </h6>
                    <p class="card-text">
                      ${summary}
                    </p>
                  </div>
                  <a href="${link}" class="card-footer">click</a>
              </div>
    </div>`;

  accordion_container.insertAdjacentHTML("beforeend", html);
};
const fetchData = async function (query) {
  try {
    const req = await fetch(`http://api.tvmaze.com/search/shows?q=${query}`);

    if (!req.ok) {
      throw Error("Something went wrong, Please try again");
    }
    const res = await req.json();

    const res_data = res.slice(0, 3).map((data) => ({
      id: data.show.id,
      type: data.show.type,
      name: data.show.name,
      summary: data.show.summary,
      link: data.show.url
    }));

    return res_data;
  } catch (error) {
    alert(error);
  }
};

const init = async function (query) {
  const dataList = await fetchData(query);
  accordion_container.innerHTML = "";
  dataList.map((data) =>
    template({
      type: data.type,
      name: data.name,
      summary: data.summary,
      link: data.link
    })
  );
};

const selectedQueryValue = select_query.value;
init(selectedQueryValue);

select_query.addEventListener("change", function (e) {
  const value = e.target.value;
  init(value);
});
