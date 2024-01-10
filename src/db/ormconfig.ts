import { DataSource, DataSourceOptions} from "typeorm";

export const dataSourceOption: DataSourceOptions = {
    type: 'postgres',
    url: 'postgresql://postgres:sahilbhatt@localhost:5432/notes',
    migrations: ["dist/db/migrations/*.js"],
    synchronize: true,
    entities: ["dist/**/*.entity.js"],
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;