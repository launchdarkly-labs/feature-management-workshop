import { COHERE, ANTHROPIC } from "@/utils/constants";
import { wait } from "@/utils/utils";
import { LDClient } from "launchdarkly-react-client-sdk";
import {
	AI_CHATBOT_BAD_SERVICE,
	AI_CHATBOT_GOOD_SERVICE,
} from "./experimentationConstants";
import { AI_CONFIG_TOGGLEBOT_LDFLAG_KEY } from "@/utils/flagConstants";
const waitTime = 0.5;

const probablityExperimentTypeAI = {
	["bayesian"]: { [ANTHROPIC]: 50, [COHERE]: 80 },
	["frequentist"]: { [ANTHROPIC]: 50, [COHERE]: 58 },
};

export const generateAIChatBotFeatureExperimentResults = async ({
	client,
	updateContext,
	setProgress,
	setIsGenerating,
	setIsComplete,
	isComplete,
	isGenerating,
	setExperimentTypeObj,
	setCurrentIteration,
	experimentTypeObj,
}: {
	client: LDClient | undefined;
	updateContext: () => void;
	setProgress: React.Dispatch<React.SetStateAction<number>>;
	setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
	isComplete: boolean;
	isGenerating: boolean;
	setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
	setExperimentTypeObj: React.Dispatch<
		React.SetStateAction<{ experimentType: string; numOfRuns: number }>
	>;
	setCurrentIteration: React.Dispatch<React.SetStateAction<number>>;
	experimentTypeObj: { experimentType: string; numOfRuns: number };
}): Promise<void> => {
	setProgress(0);
	setCurrentIteration(0);
	setIsComplete(false);
	setIsGenerating(true);
	const totalIterations = 500;
	console.log("awefawffewfaweffwef");
	const experimentType: string = experimentTypeObj.experimentType || "bayesian";
	console.log(experimentTypeObj.numOfRuns);

	const aiModelVariation = await client?.variation(
		AI_CONFIG_TOGGLEBOT_LDFLAG_KEY,
		{}
	);
	await client?.flush();

	for (let i = 1; i <= totalIterations; i++) {
		if (aiModelVariation._ldMeta.enabled) {
			if (aiModelVariation.model.name.includes(ANTHROPIC)) {
				let probablity = Math.random() * 100;
				if (
					probablity <
					probablityExperimentTypeAI[
						experimentType as keyof typeof probablityExperimentTypeAI
					][ANTHROPIC]
				) {
					await client?.track(AI_CHATBOT_GOOD_SERVICE);
					await client?.flush();
				} else {
					await client?.track(AI_CHATBOT_BAD_SERVICE);
					await client?.flush();
				}
			} else {
				//cohere
				let probablity = Math.random() * 100;
				if (
					probablity <
					probablityExperimentTypeAI[
						experimentType as keyof typeof probablityExperimentTypeAI
					][COHERE]
				) {
					await client?.track(AI_CHATBOT_GOOD_SERVICE);
					await client?.flush();
				} else {
					await client?.track(AI_CHATBOT_BAD_SERVICE);
					await client?.flush();
				}
			}
			// setProgress(
			// 	(prevProgress: number) =>
			// 		prevProgress + (1 / experimentTypeObj.numOfRuns) * 100
			// );
			// await wait(waitTime);

			await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate work
			setCurrentIteration(i);
			setProgress(Math.floor((i / totalIterations) * 100));
			// setProgress(Math.min(Math.floor((i / totalIterations) * 100), 100));
			await client?.flush();
			await updateContext();
		}

		// If this is the last iteration, mark as complete
		if (i === totalIterations) {
			setIsComplete(true);
			setIsGenerating(false);
		}

		// if (i === experimentTypeObj.numOfRuns - 1) {
		// 	setProgress(100);
		// 	setExperimentTypeObj({ experimentType: "", numOfRuns: 0 });
		// }
	}
};
