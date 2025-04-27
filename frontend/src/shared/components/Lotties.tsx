/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import dynamic from "next/dynamic";
import * as animationDataEmpty from '../../../public/animated-illustrations/Empty Order.json';
import * as animationData404 from '../../../public/animated-illustrations/404 Error Page.json';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

interface LottieControlProps {
    type: 'empty' | '404' | 'chart' | 'lock' | 'denied' | 'noSearch' | 'job' | 'noOrders' | 'soloWork' | 'teamWork' | 'notIcons';
    width?: number;
    height?: number;
}

interface Options {
    loop?: boolean | number | undefined;
    autoplay?: boolean | undefined;
    animationData: any;
    rendererSettings?: {
        preserveAspectRatio?: string | undefined;
        context?: any;
        scaleMode?: any;
        clearCanvas?: boolean | undefined;
        progressiveLoad?: boolean | undefined;
        hideOnTransparent?: boolean | undefined;
        className?: string | undefined;
    } | undefined;
}

class LottieControl extends React.Component<LottieControlProps> {
    render() {
        const { type, width, height } = this.props;

        const defaultOptionsEmpty: Options = {
            loop: true,
            autoplay: true,
            animationData: JSON.parse(JSON.stringify(animationDataEmpty)),
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        };
    
        const defaultOptions404: Options = {
            loop: true,
            autoplay: true,
            animationData: JSON.parse(JSON.stringify(animationData404)),
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        };

        let defaultOptions: Options = {} as Options;

        if (type === 'empty') {
            defaultOptions = defaultOptionsEmpty;
        } else if (type === '404') {
            defaultOptions = defaultOptions404;
        } 

        return (
            <Lottie
                options={defaultOptions}
                height={height || 350}
                width={width || 350}
                style={{ cursor: 'default' }}
                isClickToPauseDisabled
            />
        );
    }
}

export default function Lotties({ type, width, height }: LottieControlProps) {
    return (
        <div>
            <LottieControl type={type} width={width} height={height} />
        </div>
    );
}
