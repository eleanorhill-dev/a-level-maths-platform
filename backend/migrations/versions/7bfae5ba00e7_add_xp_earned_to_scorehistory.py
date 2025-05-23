"""Add xp_earned to ScoreHistory

Revision ID: 7bfae5ba00e7
Revises: d675a0ae9a62
Create Date: 2025-05-03 17:28:51.802790

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7bfae5ba00e7'
down_revision = 'd675a0ae9a62'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('score_history', schema=None) as batch_op:
        batch_op.add_column(sa.Column('xp_earned', sa.Integer()))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('score_history', schema=None) as batch_op:
        batch_op.drop_column('xp_earned')

    # ### end Alembic commands ###
