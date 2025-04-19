import chalk from "chalk";
import inquirer from "inquirer";

class CollectionCli {
  constructor(postmanService, processor) {
    this.postmanService = postmanService;
    this.processor = processor;
  }

  async run() {
    const collections = await this.postmanService.fetchCollections();

    const padRight = (str, length) =>
      str + " ".repeat(Math.max(0, length - str.length));

    const maxNameLength = Math.max(...collections.map((c) => c.name.length));
    const maxIdLength = Math.max(...collections.map((c) => c.uid.length));

    const choices = collections.map((c) => ({
      name: `${chalk.cyan("📁")} ${chalk.bold(
        padRight(c.name, maxNameLength)
      )}   ${chalk.gray(padRight(c.uid, maxIdLength))}`,
      value: c.uid,
    }));

    const { selected } = await inquirer.prompt([
      {
        type: "list",
        name: "selected",
        message: chalk.green.bold(
          "👻 Select a collection to generate documentation for:"
        ),
        choices,
        pageSize: 15,
      },
    ]);

    const collection = await this.postmanService.fetchCollectionDetails(
      selected
    );
    const updated = this.processor.processCollection(collection);

    if (updated.length === 0) {
      console.log(chalk.yellow("\n⚠️ No changes detected.\n"));
    } else {
      console.log(chalk.green(`\n✅ ${updated.length} request(s) updated:\n`));
      updated.forEach((i) => console.log(chalk.green("✔︎ ") + i));
    }
  }
}

export { CollectionCli };
