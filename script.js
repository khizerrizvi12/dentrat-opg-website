const uploadForm = document.getElementById("uploadForm");
const xrayFile = document.getElementById("xrayFile");
const previewImage = document.getElementById("previewImage");
const previewFrame = document.getElementById("previewFrame");
const resultPatient = document.getElementById("resultPatient");
const resultStatus = document.getElementById("resultStatus");
const riskLevel = document.getElementById("riskLevel");
const confidenceScore = document.getElementById("confidenceScore");
const priorityLabel = document.getElementById("priorityLabel");
const findingList = document.getElementById("findingList");
const caseTableBody = document.getElementById("caseTableBody");
const loadSampleButton = document.getElementById("loadSample");

const patientNameInput = document.getElementById("patientName");
const caseIdInput = document.getElementById("caseId");
const notesInput = document.getElementById("notes");

const sampleFindings = [
  {
    title: "Impacted mandibular third molar",
    severity: "High",
    confidence: "96%",
    detail: "The lower right third molar appears partially impacted and may require surgical assessment."
  },
  {
    title: "Interproximal caries suspicion",
    severity: "Moderate",
    confidence: "89%",
    detail: "Possible radiolucent region observed between posterior teeth; recommend bitewing confirmation."
  },
  {
    title: "Localized bone loss",
    severity: "Moderate",
    confidence: "84%",
    detail: "Reduced alveolar bone height is visible around lower anterior teeth."
  }
];

function setPreview(file) {
  if (!file) {
    previewImage.style.display = "none";
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    previewImage.src = event.target.result;
    previewImage.style.display = "block";
    const placeholder = previewFrame.querySelector(".preview-placeholder");
    if (placeholder) {
      placeholder.style.display = "none";
    }
  };
  reader.readAsDataURL(file);
}

function renderFindings(findings) {
  findingList.innerHTML = "";

  findings.forEach((finding) => {
    const item = document.createElement("article");
    item.className = "finding-item";
    item.innerHTML = `
      <header>
        <strong>${finding.title}</strong>
        <span class="badge badge-soft">${finding.severity}</span>
      </header>
      <p>${finding.detail}</p>
      <small>Confidence: ${finding.confidence}</small>
    `;
    findingList.appendChild(item);
  });
}

function appendCaseRow(caseId, patientName, status, risk) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${caseId}</td>
    <td>${patientName}</td>
    <td>${status}</td>
    <td>${risk}</td>
  `;
  caseTableBody.prepend(row);
}

function runMockAnalysis() {
  const patientName = patientNameInput.value.trim();
  const caseId = caseIdInput.value.trim();

  resultPatient.textContent = patientName || "Unnamed patient";
  resultStatus.textContent = "Analysis complete";
  riskLevel.textContent = "Moderate to High";
  confidenceScore.textContent = "91%";
  priorityLabel.textContent = "Doctor review";

  renderFindings(sampleFindings);

  if (caseId && patientName) {
    appendCaseRow(caseId, patientName, "Pending review", "Moderate");
  }
}

uploadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runMockAnalysis();
});

xrayFile.addEventListener("change", () => {
  const file = xrayFile.files[0];
  setPreview(file);
  resultStatus.textContent = file ? "Image loaded" : "Awaiting upload";
});

loadSampleButton.addEventListener("click", () => {
  patientNameInput.value = "Demo Patient";
  caseIdInput.value = "DTX-2026-014";
  notesInput.value = "Patient reports discomfort near lower right molar and swelling for one week.";
  resultPatient.textContent = "Demo Patient";
  resultStatus.textContent = "Sample ready";
  riskLevel.textContent = "Moderate";
  confidenceScore.textContent = "88%";
  priorityLabel.textContent = "Observe";
  renderFindings(sampleFindings.slice(0, 2));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
