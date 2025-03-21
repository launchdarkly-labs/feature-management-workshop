import { COHERE, ANTHROPIC } from "@/utils/constants";
import { wait } from "@/utils/utils";
import { LDClient } from "launchdarkly-react-client-sdk";

const waitTime = .5;

const probablityExperimentTypeAI = {
	["bayesian"]: { [ANTHROPIC]: 50, [COHERE]: 80 },
	["frequentist"]: { [ANTHROPIC]: 50, [COHERE]: 58 },
};

export const generateAIChatBotFeatureExperimentResults = async ({
	client,
	updateContext,
	setProgress,
	setExpGenerator,
	experimentTypeObj,
}: {
	client: LDClient | undefined;
	updateContext: ()=>void;
	setProgress: React.Dispatch<React.SetStateAction<number>>;
	setExpGenerator: React.Dispatch<React.SetStateAction<boolean>>;
	experimentTypeObj: { experimentType: string; numOfRuns: number };
}): Promise<void> => {
	setProgress(0);

	const experimentType: string = experimentTypeObj.experimentType;
	for (let i = 0; i < experimentTypeObj.numOfRuns; i++) {
		const aiModelVariation = await client?.variation(
			"ai-config--togglebot", {});
      await client?.flush();

			if(aiModelVariation._ldMeta.enabled){
				if (aiModelVariation.model.name.includes(ANTHROPIC)) {
					let probablity = Math.random() * 100;
					if (
						probablity <
						probablityExperimentTypeAI[experimentType as keyof typeof probablityExperimentTypeAI][ANTHROPIC]
					) {
						await client?.track("AI chatbot good service");
            await client?.flush();
					} else {
						await client?.track("AI Chatbot Bad Service");
            await client?.flush();
					}
				} else {
					//cohere
					let probablity = Math.random() * 100;
					if (
						probablity <
						probablityExperimentTypeAI[experimentType as keyof typeof probablityExperimentTypeAI][COHERE]
					) {
						await client?.track("AI chatbot good service");
            await client?.flush();
					} else {
						await client?.track("AI Chatbot Bad Service");
            await client?.flush();
					}
				}
				setProgress((prevProgress: number) => prevProgress + (1 / experimentTypeObj.numOfRuns) * 100);
				await wait(waitTime);
        await client?.flush();
				await updateContext();
			}
		}
	setExpGenerator(false);
};

