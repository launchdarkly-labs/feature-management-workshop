import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState, useEffect, useContext } from "react";
import LoginContext from "@/utils/contexts/login";
import { LDClient, useLDClient } from "launchdarkly-react-client-sdk";
import { generateAIChatBotFeatureExperimentResults } from "@/components/generators/experimentation-automation/featureExperimentGeneratorFunctions";
import { generateSignUpFlowFunnelExperimentResults } from "@/components/generators/experimentation-automation/funnelExperimentGeneratorFunctions";
import { Beaker, FlaskConical } from "lucide-react";
import { useLDClientError } from "launchdarkly-react-client-sdk";
import { capitalizeFirstLetter } from "@/utils/utils";
import {
	RELEASE_NEW_SIGNUP_PROMO_LDFLAG_KEY,
	AI_CONFIG_TOGGLEBOT_LDFLAG_KEY,
} from "@/utils/flagConstants";
import { wait } from "@/utils/utils";
import { set } from "lodash";

export default function ExperimentGenerator({
	title,
	flagKey,
}: {
	title: string;
	flagKey: string;
}) {
	const client: LDClient | undefined = useLDClient();
	const { updateRandomizedUserContext } = useContext(LoginContext);
	const [isGenerating, setIsGenerating] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [expGenerator, setExpGenerator] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentIteration, setCurrentIteration] = useState(0)
	const [experimentTypeObj, setExperimentTypeObj] = useState<{
		experimentType: string;
		numOfRuns: number;
	}>({ experimentType: "", numOfRuns: 0 });
	const ldClientError = useLDClientError();

	if (ldClientError) {
		alert("Error in LaunchDarkly Client");
	}

	// useEffect(() => {
	// 	switch (flagKey) {
	// 		case AI_CONFIG_TOGGLEBOT_LDFLAG_KEY:
	// 			generateAIChatBotFeatureExperimentResults({
	// 				client: client,
	// 				updateContext: updateRandomizedUserContext,
	// 				setProgress: setProgress,
	// 				setExperimentTypeObj: setExperimentTypeObj,
	// 				experimentTypeObj: experimentTypeObj,
	// 			});
	// 			break;

	// 		case RELEASE_NEW_SIGNUP_PROMO_LDFLAG_KEY:
	// 			generateSignUpFlowFunnelExperimentResults({
	// 				client: client,
	// 				updateContext: updateRandomizedUserContext,
	// 				setProgress: setProgress,
	// 				setExperimentTypeObj: setExperimentTypeObj,
	// 				experimentTypeObj: experimentTypeObj,
	// 			});
	// 			break;

	// 		default:
	// 			alert("No function exist for feature experimentation");
	// 	}

	// 	// return () => {
	// 	// 	setExperimentTypeObj({ experimentType: "", numOfRuns: 0 });
	// 	// };
	// }, [experimentTypeObj]);

	return (
		<>
			{flagKey?.includes("signup") ? (
				<FlaskConical className="mr-2 h-4 w-4" />
			) : (
				<Beaker className="mr-2 h-4 w-4" />
			)}
			<Dialog>
				<DialogTrigger asChild className="cursor-pointer">
					<p className="font-bold font-sohnelight text-lg">{title}</p>
				</DialogTrigger>
				<DialogContent>
					{isGenerating === false && (
						<div className="flex flex-col justify-center text-xl font-bold items-center h-full gap-y-4">
							<h2>{title}</h2>
							<div className="flex gap-x-4">
								<button
									onClick={async () => {
										const bayesianExperimentTypeObj = {
											experimentType: "bayesian",
											numOfRuns: 500,
										};
										setIsLoading(true);
										await wait(1);
										// setExperimentTypeObj(bayesianExperimentTypeObj);
										 generateAIChatBotFeatureExperimentResults({
											client: client,
											updateContext: updateRandomizedUserContext,
											setProgress: setProgress,
											setIsGenerating:setIsGenerating,
											setIsComplete:setIsComplete,
											isGenerating:isGenerating,
											isComplete:isComplete,
											setCurrentIteration,
											// currentIteration,
											experimentTypeObj: bayesianExperimentTypeObj,
											setExperimentTypeObj: setExperimentTypeObj,
										});
										// setExpGenerator(true);
										setIsLoading(false);
									}}
									className={`mt-2 ${"bg-gradient-airways"} p-2 rounded-sm hover:brightness-125 text-white`}
								>
									Bayesian Experimentation
								</button>

								<button
									onClick={async () => {
										const frequentistExperimentTypeObj = {
											experimentType: "frequentist",
											numOfRuns: 10000,
										};
										setIsLoading(true);
										await wait(1);
										setExperimentTypeObj(frequentistExperimentTypeObj);

										// setExpGenerator(true);
										setIsLoading(false);
									}}
									className={`mt-2 ${"bg-gradient-experimentation"} p-2 rounded-sm hover:brightness-125 text-white`}
								>
									Frequentist Experimentation
								</button>
							</div>
						</div>
					)}
					{isLoading && (
						<div className="flex justify-center items-center h-52">
							<div className=" font-bold font-sohne justify-center items-center text-xl text-center">
								Loading...
							</div>
						</div>
					)}
					{isGenerating && (
						<div className="flex justify-center items-center h-52">
							<div className=" font-bold font-sohne justify-center items-center text-xl text-center">
								Generating Data{" "}
								{capitalizeFirstLetter(experimentTypeObj.experimentType)}{" "}
								Experimentation
								<br />
								Running {experimentTypeObj.numOfRuns} runs...
								<br />
								<div className="flex items-center mt-2 justify-center">
									{/* <p>{progress.toFixed(2)}% Complete</p> */}
									<p>{progress.toFixed(2)}% Complete</p>
								</div>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
