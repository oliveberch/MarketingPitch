import { process } from "./env.js";
import { Configuration, OPENAIApi } from "/node_modules/openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openAi = new OPENAIApi(configuration);

document.getElementById("generate-pitch-btn").addEventListener("click", () => {
  const productDetails = document.getElementById("product-details").value;
  if (productDetails) {
    // Make an func request to generate the marketing pitch based on product details
    generateMarketingPitch(productDetails);
  }
});

async function generateMarketingPitch(productDetails) {
  const pitchPrompt = generatePrompt(productDetails);
  const pitch = await openAi.createCompletion({
    model: "text-curie-001",
    prompt: `${pitchPrompt}`,
    max_tokens: 25,
  });
  const marketingPitchText = pitch.data.choices[0].text.trim(); // Extract the generated pitch
  displayMarketingPitch(marketingPitchText);
}

function displayMarketingPitch(marketingPitchText) {
  const marketingPitchContainer = document.getElementById(
    "marketing-pitch-text"
  );
  marketingPitchContainer.textContent = marketingPitchText;
}
