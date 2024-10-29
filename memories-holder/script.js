document.addEventListener("DOMContentLoaded", displayMemories);

function saveMemory() {
  const imageInput = document.getElementById("image");
  const descriptionInput = document.getElementById("description");
  const documentInput = document.getElementById("document");

  const description = descriptionInput.value.trim();
  
  if (!description) {
    alert("Please add a description for the memory.");
    return;
  }

  // Convert image and document to Base64 and store along with the description
  const readerImage = new FileReader();
  const readerDoc = new FileReader();

  const memory = { description: description };

  if (imageInput.files[0]) {
    readerImage.readAsDataURL(imageInput.files[0]);
    readerImage.onload = () => {
      memory.image = readerImage.result;
      if (documentInput.files[0]) {
        readerDoc.readAsDataURL(documentInput.files[0]);
      } else {
        addMemoryToStorage(memory);
      }
    };
  }

  readerDoc.onload = () => {
    memory.document = readerDoc.result;
    addMemoryToStorage(memory);
  };
}

function addMemoryToStorage(memory) {
  const memories = JSON.parse(localStorage.getItem("memories")) || [];
  memories.push(memory);
  localStorage.setItem("memories", JSON.stringify(memories));
  displayMemories();
}

function displayMemories() {
  const memoriesList = document.getElementById("memoriesList");
  const memories = JSON.parse(localStorage.getItem("memories")) || [];
  
  memoriesList.innerHTML = "";
  memories.forEach((memory, index) => {
    const memoryDiv = document.createElement("div");
    memoryDiv.classList.add("memory-item");

    if (memory.image) {
      const img = document.createElement("img");
      img.src = memory.image;
      memoryDiv.appendChild(img);
    }
    
    const desc = document.createElement("p");
    desc.textContent = memory.description;
    memoryDiv.appendChild(desc);
    
    if (memory.document) {
      const docLink = document.createElement("a");
      docLink.href = memory.document;
      docLink.download = `Memory_${index + 1}.pdf`;
      docLink.textContent = "Download Document";
      memoryDiv.appendChild(docLink);
    }
    
    memoriesList.appendChild(memoryDiv);
  });
}