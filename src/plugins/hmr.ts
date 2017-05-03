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
        console.log('UPDATED', opts);
        if (opts.type === 'js') {
            FuseBox.flush();
            FuseBox.dynamic(opts.path, opts.content);
            if (FuseBox.mainFile) {
                FuseBox.import(FuseBox.mainFile);
            }
            return true;
        }

        return false;
    },
};

if (!process.env.hmrRegistered) {
    process.env.hmrRegistered = false;
    FuseBox.addPlugin(customizedHMRPlugin);
}
