import Player from "./Player";
import Seed from "./Seed";

const variables: {
    apiKey: string | undefined;
    eventSlug: string | undefined;
    carpools: Player[][];
    noCarpoolPlayers: Player[];
    seeding: Player[];
    seeds: Seed[];
    seedingPushed: boolean;
} = {
    apiKey: undefined,
    eventSlug: undefined,
    carpools: [],
    noCarpoolPlayers: [],
    seeding: [],
    seeds: [],
    seedingPushed: false
}
export default variables;
