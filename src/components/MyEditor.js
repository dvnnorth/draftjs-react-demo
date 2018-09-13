import React from 'react';
import Button from './Button';
import {Editor, EditorState, RichUtils} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  _onBoldClick = () => {
    console.log('this: ', this);
    console.log(this.state.editorState);
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    console.log('Activated');
}
  render() {
    return (
        <React.Fragment>
            <Editor 
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand} 
                onChange={this.onChange}    
            />
            <Button onClick={this._onBoldClick} text="Bold" />
        </React.Fragment>
    );
  }
}

export default MyEditor;