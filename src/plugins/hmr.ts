declare const FuseBox: any;

interface IHMROptions {
    type: string;
    path: string;
    content: any;
}

interface IHMRPlugin {
    hmrUpdate: (opts: IHMROptions) => boolean;
}

const customizedHMRPlugin: IHMRPlugin = {
    hmrUpdate: (opts) => {
        const shouldUpdate = (path: string) => {
            return !/stores/.test(path) && !/rendered\/state/.test(path);
        };

        // tslint:disable-next-line:no-console
        console.log('UPDATED', opts);
        if (opts.type === 'js' && shouldUpdate(opts.path)) {
            FuseBox.dynamic(opts.path, opts.content);
            FuseBox.flush(shouldUpdate);
            if (FuseBox.mainFile) {
                FuseBox.import(FuseBox.mainFile);
            }
            // tslint:disable-next-line:no-console
            console.log('RELOADED', opts);
        }

        return true;
    },
};

if (!process.env.hmrRegistered) {
    process.env.hmrRegistered = false;
    FuseBox.addPlugin(customizedHMRPlugin);
}
