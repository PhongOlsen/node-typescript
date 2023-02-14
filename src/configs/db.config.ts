import mongoose, { ConnectOptions } from "mongoose";

interface IOnConnectedCallback {
    (): void;
}

class ConnectDatabase {

    /** URL to access mongo */
    private readonly mongoDbUrl: string;

    /** Callback when mongo connection is established or re-established */
    private onConnectedCallback: IOnConnectedCallback;

    private isConnectedBefore: boolean = false;

    private readonly mongoConnectionOptions: ConnectOptions = {
    };

    constructor(mongoUrl: string) {
        if (process.env.NODE_ENV === 'development') {
            mongoose.set('debug', true);
        }

        this.mongoDbUrl = mongoUrl;
        mongoose.connection.on('error', this.onError);
        mongoose.connection.on('disconnected', this.onDisconnected);
        mongoose.connection.on('connected', this.onConnected);
        mongoose.connection.on('reconnected', this.onReconnected);
    }

    /** Start mongo connection */
    public connect(onConnectedCallback: IOnConnectedCallback) {
        this.onConnectedCallback = onConnectedCallback;
        this.startConnection().then();
    }

    public startConnection = async () => {
        await mongoose.connect(this.mongoDbUrl, this.mongoConnectionOptions);
    }

    /**
   * Handler called when mongo connection is established
   */
    private onConnected = () => {
        this.isConnectedBefore = true;
        this.onConnectedCallback();
    };

    /** Handler called when mongo gets re-connected to the database */
    private onReconnected = () => {
        this.onConnectedCallback();
    };

    /** Handler called for mongo connection errors */
    private onError = () => {
        process.exit(1);
    };

    /** Handler called when mongo connection is lost */
    private onDisconnected = () => {
        if (!this.isConnectedBefore) {
            setTimeout(() => {
                this.startConnection();
            }, 2000);
        }
    };
};

export default ConnectDatabase;
