const chai = require('chai');
chai.use(require('chai-fs'));
const expect = chai.expect;
const cmd = require('./cmd');
const rimraf = require('rimraf');

const cli = cmd.create(__dirname + '/../lib/index.js');

describe('biotope', () => {
  describe('create', () => {
    afterEach(async () => {  
      rimraf(process.cwd() + '/biotope-boilerplate', () => {});
      rimraf(process.cwd() + '/my-project', () => {});
    });

    it('asks the user for the version', async () => {
      const response = await cli.execute(
        ['create'],
        []
      );
      
      expect(response).to.contain('Which version do you want to generate?');
    })

    it('asks the user for the template', async () => {
      const response = await cli.execute(
        ['create'],
        [
          cmd.ENTER
        ]
      );
      
      expect(response).to.contain('Which template do you want to generate?');
    })

    it('pulls the repository without name', async () => {
      expect(process.cwd() + '/biotope-boilerplate').to.not.be.a.path(`Please cleanup your environment and remove ${process.cwd()}/biotope-boilerplate`);
      await cli.execute(
        ['create'],
        [
          cmd.ENTER,
          cmd.ENTER,
        ],
        {
          maxTimeout: 5000
        }
      );
      expect(process.cwd() + '/biotope-boilerplate').to.be.a.directory();
    }).timeout(10000)
  
    it('pulls the repository with name', async () => {
      expect(process.cwd() + '/my-project').to.not.be.a.path(`Please cleanup your environment and remove ${process.cwd()}/my-project`);
      await cli.execute(
        [
          'create',
          'my-project'
        ],
        [
          cmd.ENTER,
          cmd.ENTER,
        ],
        {
          maxTimeout: 5000
        }
      );
      expect(process.cwd() + '/my-project').to.be.a.directory();
    }).timeout(10000)

    it('does not ask the user for the template if he chooses beta', async () => {
      const response = await cli.execute(
        ['create'],
        [
          cmd.DOWN,
          cmd.ENTER
        ],
        {
          maxTimeout: 1000
        }
      );
      
      expect(response).to.not.contain('Which template do you want to generate?');
    })
  })
  describe('generate', () => {
    it('asks the user for the version of the component', async () => {
      const response = await cli.execute([
        'generate'
      ]);

      expect(response).to.contain('version')
    })

    it('asks the user for the name of the component', async () => {
      const response = await cli.execute([
        'generate',
      ], [
        cmd.ENTER
      ]);

      expect(response).to.contain('Component name')
    })

    it('does not allow invalid componen names', async () => {
      const response = await cli.execute(
        [
          'generate'
        ],
        [
          cmd.ENTER,
          'mycomponent',
          cmd.ENTER
        ]
      );

      expect(response).to.contain('not a valid')
    })

    it('asks the user for the features of the component', async () => {
      const response = await cli.execute(
        [
          'generate',
        ],
        [
          cmd.ENTER,
          'MyComponent',
          cmd.ENTER
        ]
      );

      expect(response).to.contain('What should your component contain?')
    })

    it('asks the user for the location of the component', async () => {
      const response = await cli.execute(
        [
          'generate',
        ],
        [
          cmd.ENTER,
          'MyComponent',
          cmd.ENTER,
          cmd.ENTER
        ]
      );

      expect(response).to.contain('Where to put it?')
    })

    it('asks the user if he wants to generate a page template', async () => {
      const response = await cli.execute(
        [
          'generate',
        ],
        [
          cmd.ENTER,
          'MyComponent',
          cmd.ENTER,
          cmd.ENTER,
          cmd.ENTER
        ]
      );

      expect(response).to.contain('Should a')
      expect(response).to.contain('template be created?')
    })

    it('generates component files without template', async () => {
      await cli.execute(
        [
          'generate',
        ],
        [
          cmd.ENTER,
          'MyComponent',
          cmd.ENTER,
          cmd.ENTER,
          'test-components',
          cmd.ENTER,
          cmd.ENTER
        ]
      );

      expect(process.cwd() + '/test-components').to.be.a.directory();
      expect(process.cwd() + '/test-components/MyComponent').to.be.a.directory().with.contents([
        'index.ts',
        'MyComponent.ts',
        'styles.scss',
        'template.ts',
        'defines.ts'
      ]);

      rimraf(process.cwd() + '/test-components', () => {});
    }).timeout(3000)

    it('asks the user for a page layout', async () => {
      const response = await cli.execute(
        [
          'generate',
        ],
        [
          cmd.ENTER,
          'MyComponent',
          cmd.ENTER,
          cmd.ENTER,
          'test-components',
          cmd.ENTER,
          'Y',
          cmd.ENTER
        ],
      );

      expect(response).to.contain('Which layout should be used?');
    }).timeout(3000)

    it('asks the user for a directory to write the page template to', async () => {
      const response = await cli.execute(
        [
          'generate',
        ],
        [
          cmd.ENTER,
          'MyComponent',
          cmd.ENTER,
          cmd.ENTER,
          'test-components',
          cmd.ENTER,
          'Y',
          cmd.ENTER,
          cmd.ENTER
        ]
      );

      expect(response).to.contain('Then where to put the page?');
    }).timeout(4000)

    it('generates page templates in addition to the component', async () => {
      await cli.execute(
        [
          'generate',
        ],
        [
          cmd.ENTER,
          'MyComponent',
          cmd.ENTER,
          cmd.ENTER,
          'test-components',
          cmd.ENTER,
          'Y',
          cmd.ENTER,
          cmd.ENTER,
          'test-pages',
          cmd.ENTER
        ]
      )

      expect(process.cwd() + '/test-components').to.be.a.directory();
      expect(process.cwd() + '/test-components/MyComponent').to.be.a.directory().with.contents([
        'index.ts',
        'MyComponent.ts',
        'styles.scss',
        'template.ts',
        'defines.ts',
        'scaffolding'
      ]);
      expect(process.cwd() + '/test-components/MyComponent/scaffolding').to.be.a.directory().with.contents([
        'MyComponent.hbs',
      ]);
      expect(process.cwd() + '/test-pages').to.be.a.directory().with.contents([
        '10components.MyComponent.hbs'
      ]);

      rimraf(process.cwd() + '/test-components', () => {});
      rimraf(process.cwd() + '/test-pages', () => {});
    }).timeout(5000)
  })
});