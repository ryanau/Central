# Central
IEOR 185 Project

To start backend, run `bundle install`, then `rake db:create`, then `rake db:migrate`, then `rails s`

To start frontend, run `npm install`, then `npm run watch`

Add `.babelrc` file at root with the following:
`
{
  "optional": ["runtime"],
  "stage": 0,
  "comments": false
}
`