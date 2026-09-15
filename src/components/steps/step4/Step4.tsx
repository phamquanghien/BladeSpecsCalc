import React from 'react';
import { Step4Inputs } from './Step4Inputs';
import { Step4DistributionTable } from './Step4DistributionTable';
import { Step3DistributionTable } from '../step3/Step3DistributionTable';

export const Step4: React.FC = () => {
    return (
        <div className="step4-wrapper">
            <Step4Inputs />
            <Step3DistributionTable />
            <Step4DistributionTable />
        </div>
    );
};
