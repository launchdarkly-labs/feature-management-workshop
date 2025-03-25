import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState, useContext } from "react";
import LoginContext from "@/utils/contexts/login";
import { LDClient, useLDClient } from "launchdarkly-react-client-sdk";
import { generateAIChatBotFeatureExperimentResults } from "@/components/generators/experimentation-automation/featureExperimentGeneratorFunctions";
import { generateSignUpFlowFunnelExperimentResults } from "@/components/generators/experimentation-automation/funnelExperimentGeneratorFunctions";
import { Beaker, FlaskConical } from "lucide-react";
import { useLDClientError } from "launchdarkly-react-client-sdk";
import { capitalizeFirstLetter } from "@/utils/utils";
import { BAYESIAN, FREQUENTIST } from "./experimentationConstants";
import { wait } from "@/utils/utils";

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
	const [progress, setProgress] = useState<number>(0);
	const [currentIteration, setCurrentIteration] = useState(0);
	const [experimentTypeObj, setExperimentTypeObj] = useState<{
		experimentType: string;
		numOfRuns: number;
	}>({ experimentType: "", numOfRuns: 0 });
	const ldClientError = useLDClientError();

	if (ldClientError) {
		alert("Error in LaunchDarkly Client");
	}

	const runGenerator = async ({
		flagKey,
		experimentType,
	}: {
		flagKey: string;
		experimentType: string;
	}) => {
		const functionInputs = {
			client: client,
			updateContext: updateRandomizedUserContext,
			setProgress: setProgress,
			setIsGenerating: setIsGenerating,
			setIsComplete: setIsComplete,
			experimentType: experimentType,
			setCurrentIteration: setCurrentIteration,
		};
		if (flagKey?.includes("signup")) {
			await generateSignUpFlowFunnelExperimentResults({
				...functionInputs,
			});
		} else {
			await generateAIChatBotFeatureExperimentResults({
				...functionInputs,
			});
		}
	};

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
										await setExperimentTypeObj(bayesianExperimentTypeObj);
										runGenerator({ flagKey, experimentType: BAYESIAN });
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
										await setExperimentTypeObj(frequentistExperimentTypeObj);
										runGenerator({ flagKey, experimentType: FREQUENTIST });
									}}
									className={`mt-2 ${"bg-gradient-experimentation"} p-2 rounded-sm hover:brightness-125 text-white`}
								>
									Frequentist Experimentation
								</button>
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
								Running {currentIteration}/{experimentTypeObj.numOfRuns} runs...
								<br />
								<div className="flex items-center mt-2 justify-center">
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
