import { wait } from "@/utils/utils";
import {
	SIGN_UP_STARTED,
	INITIAL_SIGN_UP_COMPLETED,
	PERSONAL_DETAIL_COMPLETED,
	SIGNUP_COMPLETED,
} from "./experimentationConstants";
import { LDClient } from "launchdarkly-react-client-sdk";
import { RELEASE_NEW_SIGNUP_PROMO_LDFLAG_KEY } from "@/utils/flagConstants";

const waitTime = 0.5;

const probablityExperimentTypeStoreHeader = {
	["bayesian"]: {
		["No Banner"]: {
			//control
			metric1: 60,
			metric2: 50,
			metric3: 40,
			metric4: 30,
		},
		["New Banner"]: {
			// winner
			metric1: 70,
			metric2: 60,
			metric3: 50,
			metric4: 40,
		},
	},
	["frequentist"]: {
		["No Banner"]: {
			//control
			metric1: 66,
			metric2: 56,
			metric3: 46,
			metric4: 36,
		},
		["New Banner"]: {
			// winner
			metric1: 70,
			metric2: 60,
			metric3: 50,
			metric4: 40,
		},
	},
};

export const generateSignUpFlowFunnelExperimentResults = async ({
	client,
	updateContext,
	setProgress,
	setExperimentTypeObj,
	experimentTypeObj,
}: {
	client: LDClient | undefined;
	updateContext: () => void;
	setProgress: React.Dispatch<React.SetStateAction<number>>;
	setExperimentTypeObj: React.Dispatch<
		React.SetStateAction<{ experimentType: string; numOfRuns: number }>
	>;
	experimentTypeObj: { experimentType: string; numOfRuns: number };
}): Promise<void> => {
	setProgress(0);

	const experimentType: string = experimentTypeObj.experimentType;
console.log("awefawef")
	for (let i = 0; i < experimentTypeObj.numOfRuns; i++) {
		const flagVariation: string = client?.variation(
			RELEASE_NEW_SIGNUP_PROMO_LDFLAG_KEY,
			false
		);

		let stage1metric = Math.random() * 100;

		const metricProbablityObj =
			probablityExperimentTypeStoreHeader[
				experimentType as keyof typeof probablityExperimentTypeStoreHeader
			];
		//if true then control else winner
		let variationName = "";
		if (flagVariation) {
			variationName = "No Banner";
		} else {
			variationName = "New Banner";
		}
		const metricProbablity =
			metricProbablityObj[flagVariation as keyof typeof metricProbablityObj];
		if (stage1metric < metricProbablity.metric1) {
			await client?.track(SIGN_UP_STARTED);
			await client?.flush();
			let stage2metric = Math.random() * 100;

			if (stage2metric < metricProbablity.metric2) {
				await client?.track(INITIAL_SIGN_UP_COMPLETED);
				await client?.flush();
				let stage3metric = Math.random() * 100;

				if (stage3metric < metricProbablity.metric3) {
					await client?.track(PERSONAL_DETAIL_COMPLETED);
					await client?.flush();
					let stage4metric = Math.random() * 100;

					if (stage4metric < metricProbablity.metric4) {
						await client?.track(SIGNUP_COMPLETED);
						await client?.flush();
					}
				}
			}
		}
		setProgress(
			(prevProgress: number) =>
				prevProgress + (1 / experimentTypeObj.numOfRuns) * 100
		);
		await wait(waitTime);
		await updateContext();

		if (i === experimentTypeObj.numOfRuns - 1) {
			setProgress(100);
			setExperimentTypeObj({ experimentType: "", numOfRuns: 0 });
		}
	}
};
