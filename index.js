// const test = fetch("https://api.recursionist.io/builder/computers?type=cpu")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data[0].Type);
//   });

const config = {
  url: "https://api.recursionist.io/builder/computers?type=",
  parentId: "target",
  RamArr: [1, 2, 4, 8],
  storageTypeArr: ["HDD", "SSD"],
  cpu: "cpu",
  gpu: "gpu",
  ram: "ram",
  hdd: "hdd",
  ssd: "ssd",
};

function viewDisplay() {
  //targetにヘッダー部分を作成追加
  let parent = document.getElementById(config.parentId);
  // 初期化
  parent.innerHTML = "";
  parent.innerHTML = `
   <div class="bg-dark text-center text-white" style="height:55px ;">
    <h1>Build Your Own Computer</h1>
  </div>
  <div class="mt-4 mx-1">
    <h4>step1: Select Your CPU</h4>
  </div>

  <div class="mx-1 d-flex">
    <h5>Brand</h5>
    <select name="Brand" id="cpuBrand" class="select mx-3">
    </select>
    <h5>Model</h5>
    <select name="Model" id="cpuModel" class="select mx-3">
      <option value="">-</option>
    </select>
  </div>

  <div class="mt-4 mx-1">
    <h4>step２: Select Your GPU</h4>
  </div>

  <div class="mx-1 d-flex">
    <h5>Brand</h5>
    <select name="Brand" id="gpuBrand" class="select mx-3">
    </select>
    <h5>Model</h5>
    <select name="Model" id="gpuModel" class="select mx-3">
      <option value="">-</option>
    </select>
  </div>

  <div class="mt-4 mx-1">
    <h4>step3: Select Your Memory Card</h4>
  </div>

  <div class="mx-1 d-flex align-items-center">
    <h5 style="width: 70px;">How many?</h5>
    <select name="" id="memoryMany" class="howMany mx-3">
    </select>
    <h5>Brand</h5>
    <select name="Brand" id="memoryBrand" class="select mx-3">
      <option value="">-</option>
    </select>
    <h5>Model</h5>
    <select name="Model" id="memoryModel" class="select mx-3">
      <option value="">-</option>
    </select>
  </div>
  <div class="mt-4 mx-1">
    <h4>step4: Select Your Storage</h4>
  </div>
  <div class="mx-1 d-flex align-items-center">
    <h5 style="width: 50px;">HDD or SSD</h5>
    <select name="selectStorage" id="selectStorage" class="mx-3 storageSelect">
    </select>
    <h5>Storage</h5>
    <select name="size" id="storageSize" class="mx-3 storageSelect">
      <option value="">-</option>
    </select>
    <h5>Brand</h5>
    <select name="Brand" id="storageBrand" class="mx-3 storageSelect">
      <option value="">-</option>
    </select>

    <h5>Model</h5>
    <select name="Model" id="storageModel" class="mx-3 storageSelect">
      <option value="">-</option>
    </select>
  </div>

  <button id="addPcBtn" class="btn btn-primary mx-1 my-3">Add PC</button>

  <div class="bg-primary d-none col-12 py-3" id="pcInfo">
  <div class="col-12">
    <h3 class="text-center text-white">Your PC1</h3>
  </div>
  <div id=pcDetail></div>

  <div class="row">
    <div class="col text-white" id="game-score">
      <h3>Gaming:</h3>
    </div>
    <div class="col text-white" id="work-score">
      <h3>Work:</h3>
    </div>
  </div>
  </div>
    `;

  // apiからcpuのオブジェクトを取得し内容を反映
  const cpuBrandEl = document.getElementById("cpuBrand");
  const cpuModelEl = document.getElementById("cpuModel");
  const gpuBrandEl = document.getElementById("gpuBrand");
  const gpuModelEl = document.getElementById("gpuModel");
  const memoryMany = document.getElementById("memoryMany");
  const memoryBrandEl = document.getElementById("memoryBrand");
  const memoryModelEl = document.getElementById("memoryModel");
  const selectStorageEl = document.getElementById("selectStorage");
  const storageSizeEl = document.getElementById("storageSize");
  const storageBrandEl = document.getElementById("storageBrand");
  const storageModelEl = document.getElementById("storageModel");
  const addPcBtn = document.getElementById("addPcBtn");
  const pcInfo = document.getElementById("pcInfo");
  const pcDetail = document.getElementById("pcDetail");
  console.log(pcInfo);

  // cpu初期描画
  initialRendering(config.cpu, cpuBrandEl, cpuModelEl);
  // gpu初期描画
  initialRendering(config.gpu, gpuBrandEl, gpuModelEl);
  // ram初期描画
  initialRendering(config.ram, memoryMany);
  // HDD初期描画
  initialRendering(config.hdd, selectStorageEl);
  // SSD初期描画
  initialRendering(config.ssd, selectStorageEl);

  // cpuBrandが選択された後の処理
  cpuBrandEl.addEventListener("change", (event) => {
    afterProcess(event, config.cpu, cpuBrandEl, cpuModelEl);
  });
  // gpuBrandが選択された後の処理
  gpuBrandEl.addEventListener("change", (event) => {
    afterProcess(event, config.gpu, gpuBrandEl, gpuModelEl);
  });
  //Storageの種類が選択された時の処理
  selectStorageEl.addEventListener("change", (event) => {
    // console.log("///////" + event.target.value);
    // storageSizeEl.innerHTML = `<option>-</option>`;
    storageBrandEl.innerHTML = `<option>-</option>`;
    storageModelEl.innerHTML = `<option>-</option>`;

    if (event.target.value == "HDD")
      afterProcess(
        event,
        config.hdd,
        selectStorageEl,
        storageSizeEl,
        storageBrandEl,
        storageModelEl
      );
    else
      afterProcess(
        event,
        config.ssd,
        selectStorageEl,
        storageSizeEl,
        storageBrandEl,
        storageModelEl
      );
  });
  memoryMany.addEventListener("change", (event) => {
    afterProcess(event, config.ram, memoryBrandEl, memoryModelEl);
  });

  //AddPCが押された時の処理
  addPcBtn.addEventListener("click", () => {
    // confirm("全ての項目を選択してください");
    //選択された各パーツの情報を取得
    const partsObj = {
      CPU: {
        Brand: cpuBrandEl.value,
        Model: cpuModelEl.value,
      },

      GPU: {
        Brand: gpuBrandEl.value,
        Model: gpuModelEl.value,
      },

      RAM: {
        Brand: memoryBrandEl.value,
        Model: memoryModelEl.value,
      },
      STORAGE: {
        Disk: selectStorageEl.value,
        Storage: storageSizeEl.value,
        Brand: storageBrandEl.value,
        Model: storageModelEl.value,
      },
    };
    // 初期化
    pcDetail.innerHTML = ""
    // console.log(partsObj)
    for (const property in partsObj) {
      divEl = document.createElement("div");
      divEl.classList.add("col-12", "text-white", "pb-2");

      let detailObj = partsObj[property];
      let htmlString = `<h4>${property}</h4>`;

      for (const key in detailObj) {
        if (detailObj[key] === "") {
          confirm("全ての項目を選択してください");
          return;
        }
        htmlString += `
        <p>${key}:${detailObj[key]}</p>
        `;
      }

      divEl.innerHTML = htmlString;
      pcDetail.append(divEl);
    }

    //PCの情報一覧を表示
    pcInfo.classList.remove("d-none");
  });
}

//パーツ名を受け取りapiに接続してselectBoxにoptionの項目を追加
function afterProcess(
  event,
  parts,
  referencesEl,
  referentEl1,
  referentEl2,
  referentEl3
) {
  // console.log(event.target.value);
  // console.log(parts);
  // APIからパーツのデータを取得
  const data = getApiInfo(parts);
  data.then((data) => {
    // console.log(data);
    // console.log(event.target.value);
    // Brandが選択された時の処理
    if (event.target.name === "Brand") {
      // console.log("Brandが選択されました");
      // console.log(data);

      const arrSet = createOptionFilterArr(
        data,
        event.target.value,
        referencesEl.name,
        referentEl1.name
      );
      console.log(arrSet);
      insertOption(arrSet, "", referentEl1);
      // HDDが選択された時の処理
    } else if (event.target.value === "HDD" || event.target.value === "SSD") {
      storageProcessing(
        data,
        event.target.value,
        referentEl1,
        referentEl2,
        referentEl3
      );
      // RAMが選択された時の処理
    } else if (parts === "ram") {
      ramProcessing(data, event.target.value, referencesEl, referentEl1);
    }
  });
}
function ramProcessing(data, eventValue, referencesEl, referentEl1) {
  // console.log(`Ramの数量 ${eventValue} が選択されました`);
  referencesEl.innerHTML = `<option>-</option>`;
  referentEl1.innerHTML = `<option>-</option>`;

  filterData = data.filter((obj) => {
    const modelInfo = obj["Model"].split(" ");
    const modelLen = modelInfo.length - 1;
    const slotNum = modelInfo[modelLen].substring(0, 1);
    return eventValue === slotNum;
  });
  // console.log(filterData);
  const arrSet = createOptionArr(filterData, referencesEl.name);
  // console.log(arrSet);
  insertOption(arrSet, "", referencesEl);

  referencesEl.addEventListener("change", (event) => {
    // console.log(`RamのBrand ${eventValue} が選択されました`);
    referentEl1.innerHTML = `<option>-</option>`;
    const arrSet = createOptionFilterArr(
      filterData,
      event.target.value,
      referencesEl.name,
      referentEl1.name
    );
    // console.log(arrSet);
    insertOption(arrSet, "", referentEl1);
  });
}

// Storageの処理
function storageProcessing(
  data,
  eventValue,
  referentEl1,
  referentEl2,
  referentEl3
) {
  // console.log(data[0].Type);
  // console.log(eventValue);
  // console.log(referentEl1);
  // console.log(referentEl2);
  // console.log(referentEl3);
  // サイズを抜き取るためModelで検索しmodel情報を取得
  const storageArrSet = createOptionArr(data, referentEl3.name);
  // console.log(storageArrSet);
  // モデル情報からストレージのサイズ一覧を配列で返す
  const storageSizeArr = returnsTheRequiredStringArr(storageArrSet);
  // console.log(storageSizeArr);
  insertOption(storageSizeArr, "", referentEl1);

  //Storageのサイズが選択されたら
  referentEl1.addEventListener("change", (event) => {
    // console.log(event.target.value);
    // console.log(referentEl2);

    if (event.target.name == "size") {
      // console.log("ストレージサイズが選択されました");
      referentEl2.innerHTML = `<option>-</option>`;
      // console.log(referentEl2);
      referentEl3.innerHTML = `<option>-</option>`;
      // console.log(referentEl3);

      // console.log(event.target.value);
      // console.log(data);
      // console.log(referentEl1.name);
      // console.log(referentEl2.name);
      const arrSet = strReturnObjArr(
        data,
        event.target.value,
        referentEl2.name,
        referentEl3.name
      );
      // console.log(arrSet);
      insertOption(arrSet, "", referentEl2);

      referentEl2.addEventListener("change", (event) => {
        // console.log("Brandが選択されました");
        referentEl3.innerHTML = `<option>-</option>`;

        const filterData = data.filter(
          (obj) => obj[referentEl3.name].indexOf(referentEl1.value) != -1
        );
        // console.log(filterData);
        // console.log(referentEl3.name);
        const arrSet = createOptionFilterArr(
          filterData,
          event.target.value, //Brand
          referentEl2.name, //Brand名
          referentEl3.name //Model
        );
        // console.log(arrSet);
        insertOption(arrSet, "", referentEl3);
      });
    }
  });
}

// [{}]の配列を受け取り第２引数の値でフィルターをかけた配列を返す
// Brand=>Model
function createOptionFilterArr(data, eventValue, target1, target2) {
  console.log(data, eventValue, target1, target2);

  const arrSet = Array.from(
    new Set(
      data
        .filter((obj) => obj[target1] === eventValue)
        .map((obj) => obj[target2])
    )
  );
  return arrSet;
}
//受け取った文字列を含むオブジェクトを[{},{},{},{}]形式で返す
// storageSize=>Model
// 引数(data(APIから取得したデータ),findStr(検索値),objectKey1(Brand),objectKey2(Model))
function strReturnObjArr(data, findStr, objKey1, objKey2) {
  console.log(data, findStr, objKey1, objKey2);
  console.log(data.filter((obj) => obj[objKey2].indexOf(findStr) != -1));
  return Array.from(
    new Set(
      data
        .filter((obj) => obj[objKey2].indexOf(findStr) != -1)
        .map((obj) => obj[objKey1])
    )
  );
}

// APIからのdataと要素名を受け取って配列の中のオブジェクトのkeyを要素名にし、その値を配列(重複なし)にして返す
function createOptionArr(data, elName) {
  // console.log(data, elName);
  const arrSet = Array.from(new Set(data.map((obj) => obj[elName])));
  // console.log("item数　" + arrSet.length);
  // console.log(arrSet);
  return arrSet;
}

// 配列と要素を受け取りオプションタグに配列の値を代入する関数
function insertOption(arrSet, referencesEl, referentEl) {
  let optionString = `<option value="">-</option>`;
  for (let data of arrSet) {
    optionString += `<option value="${data}">${data}</option>`;
  }
  if (
    referencesEl.id == "cpuBrand" ||
    referencesEl.id == "gpuBrand" ||
    referencesEl.id == "selectStorage" ||
    referencesEl.id == "memoryMany"
  )
    referencesEl.innerHTML = optionString;
  else referentEl.innerHTML = optionString;
}

// 文字列の配列を受け取り必要な文字をを抜き出し配列にまとめて返す関数
function returnsTheRequiredStringArr(arr) {
  let newarr = arr.map((str) => str.split(" "));
  let sizeTBArr = [];
  let sizeGBArr = [];
  for (let data of newarr) {
    for (let str of data) {
      if (str.indexOf("TB") != -1) {
        num = str.replace("TB", "");
        sizeTBArr.push(num);
      }
      if (str.indexOf("GB") != -1) {
        num = str.replace("GB", "");
        sizeGBArr.push(num);
      }
    }
  }

  const sizeArr = Array.from(new Set(sizeTBArr))
    .sort((a, b) => b - a)
    .map((str) => (str += "TB"))
    .concat(
      Array.from(new Set(sizeGBArr))
        .sort((a, b) => b - a)
        .map((str) => (str += "GB"))
    );
  return sizeArr;
}

// 初期描画
function initialRendering(parts, referencesEl, referentEl1) {
  const data = getApiInfo(parts);
  data.then((data) => {
    // 初期描画 CPU,GPUのBrandのセレクトボックスの処理
    if (data[0].Type === "CPU" || data[0].Type === "GPU") {
      // console.log("CPUGPU初期描画");
      const cpuGpuArr = createOptionArr(data, referencesEl.name);
      insertOption(cpuGpuArr, referencesEl, referentEl1);
    } else if (data[0].Type === "RAM") {
      // console.log("RAM初期描画");
      // 初期描画 RAM,HDD,SSDのBrandのセレクトボックスの処理
      insertOption(config.RamArr, referencesEl, referentEl1);
    } else if (data[0].Type === "HDD" || data[0].Type === "SSD") {
      // console.log("Storage初期描画");
      insertOption(config.storageTypeArr, referencesEl, referentEl1);
    }
  });
}
//apiから情報を取得
function getApiInfo(parts) {
  return fetch(config.url + parts)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

viewDisplay();

